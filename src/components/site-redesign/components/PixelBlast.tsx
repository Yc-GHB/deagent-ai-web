// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './PixelBlast.css'

type PixelBlastProps = {
  color?: string
  pixelSize?: number
  patternScale?: number
  patternDensity?: number
  pixelSizeJitter?: number
  rippleSpeed?: number
  rippleThickness?: number
  rippleIntensityScale?: number
  liquidStrength?: number
  liquidRadius?: number
  liquidWobbleSpeed?: number
  speed?: number
  edgeFade?: number
  enableRipples?: boolean
  liquid?: boolean
  transparent?: boolean
  className?: string
}

const MAX_CLICKS = 10

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform vec3 uColor;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uPixelSize;
  uniform float uScale;
  uniform float uDensity;
  uniform float uJitter;
  uniform float uRippleSpeed;
  uniform float uRippleThickness;
  uniform float uRippleIntensity;
  uniform float uEdgeFade;
  uniform float uEnableRipples;
  uniform vec2 uPointer;
  uniform vec2 uPointerVelocity;
  uniform float uLiquidStrength;
  uniform float uLiquidRadius;
  uniform vec2 uClickPositions[${MAX_CLICKS}];
  uniform float uClickTimes[${MAX_CLICKS}];

  out vec4 fragColor;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float valueNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float n = dot(i, vec3(1.0, 57.0, 113.0));
    return mix(
      mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
      mix(mix(hash(n + 113.0), hash(n + 114.0), f.x), mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y),
      f.z
    ) * 2.0 - 1.0;
  }

  float fbm(vec2 uv, float time) {
    vec3 p = vec3(uv * uScale, time);
    float sum = 1.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      sum += amplitude * valueNoise(p * frequency);
      frequency *= 1.25;
    }
    return sum * 0.5 + 0.5;
  }

  float bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }

  float bayer4(vec2 a) {
    return bayer2(0.5 * a) * 0.25 + bayer2(a);
  }

  float bayer8(vec2 a) {
    return bayer4(0.5 * a) * 0.25 + bayer2(a);
  }

  float circlePixel(vec2 uv, float coverage) {
    float radius = sqrt(max(coverage, 0.0)) * 0.25;
    float distanceToEdge = length(uv - 0.5) - radius;
    float antialias = max(0.5 * fwidth(distanceToEdge), 0.0001);
    return coverage * (1.0 - smoothstep(-antialias, antialias, distanceToEdge * 2.0));
  }

  void main() {
    vec2 pointerDelta = gl_FragCoord.xy - uPointer;
    float pointerDistance = length(pointerDelta) / max(uResolution.y, 1.0);
    float pointerInfluence = exp(-pow(pointerDistance / max(0.04 * uLiquidRadius, 0.001), 2.0));
    vec2 liquidOffset = uPointerVelocity * pointerInfluence * uLiquidStrength * uResolution;
    vec2 fragment = gl_FragCoord.xy - liquidOffset - uResolution * 0.5;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 pixelId = floor(fragment / uPixelSize);
    vec2 pixelUv = fract(fragment / uPixelSize);
    float cellSize = 8.0 * uPixelSize;
    vec2 cell = floor(fragment / cellSize) * cellSize;
    vec2 noiseUv = cell / uResolution * vec2(aspect, 1.0);

    float feed = fbm(noiseUv, uTime * 0.05) * 0.5 - 0.65 + (uDensity - 0.5) * 0.3;

    if (uEnableRipples > 0.5) {
      for (int i = 0; i < ${MAX_CLICKS}; i++) {
        if (uClickPositions[i].x < 0.0) continue;
        vec2 clickUv = (uClickPositions[i] - uResolution * 0.5 - cellSize * 0.5) / uResolution * vec2(aspect, 1.0);
        float age = max(uTime - uClickTimes[i], 0.0);
        float distanceFromClick = distance(noiseUv, clickUv);
        float wave = exp(-pow((distanceFromClick - uRippleSpeed * age) / uRippleThickness, 2.0));
        float attenuation = exp(-age) * exp(-10.0 * distanceFromClick);
        feed = max(feed, wave * attenuation * uRippleIntensity);
      }
    }

    float threshold = bayer8(fragment / uPixelSize) - 0.5;
    float coverage = step(0.5, feed + threshold);
    float randomSize = fract(sin(dot(pixelId, vec2(127.1, 311.7))) * 43758.5453);
    coverage *= 1.0 + (randomSize - 0.5) * uJitter;
    float mask = circlePixel(pixelUv, coverage);

    vec2 normalized = gl_FragCoord.xy / uResolution;
    float edge = min(min(normalized.x, normalized.y), min(1.0 - normalized.x, 1.0 - normalized.y));
    mask *= smoothstep(0.0, uEdgeFade, edge);

    vec3 srgb = mix(
      uColor * 12.92,
      1.055 * pow(uColor, vec3(1.0 / 2.4)) - 0.055,
      step(0.0031308, uColor)
    );
    fragColor = vec4(srgb, mask);
  }
`

export default function PixelBlast({
  color = '#2e515a',
  pixelSize = 6,
  patternScale = 3,
  patternDensity = 1.2,
  pixelSizeJitter = 0.5,
  rippleSpeed = 0.4,
  rippleThickness = 0.12,
  rippleIntensityScale = 1.5,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  liquidWobbleSpeed = 5,
  speed = 0.6,
  edgeFade = 0.25,
  enableRipples = true,
  liquid = true,
  transparent = true,
  className = '',
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearAlpha(transparent ? 0 : 1)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    const uniforms = {
      uColor: { value: new THREE.Color(color) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uJitter: { value: pixelSizeJitter },
      uRippleSpeed: { value: rippleSpeed },
      uRippleThickness: { value: rippleThickness },
      uRippleIntensity: { value: rippleIntensityScale },
      uEdgeFade: { value: edgeFade },
      uEnableRipples: { value: enableRipples ? 1 : 0 },
      uPointer: { value: new THREE.Vector2(-9999, -9999) },
      uPointerVelocity: { value: new THREE.Vector2(0, 0) },
      uLiquidStrength: { value: liquid ? liquidStrength : 0 },
      uLiquidRadius: { value: liquidRadius },
      uClickPositions: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(MAX_CLICKS) },
    }
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3,
    })
    scene.add(new THREE.Mesh(geometry, material))

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)
      renderer.setSize(width, height, false)
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let currentClick = 0
    let previousPointer: { x: number; y: number } | null = null
    const pointerPosition = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect()
      const xScale = renderer.domElement.width / bounds.width
      const yScale = renderer.domElement.height / bounds.height
      return {
        x: (event.clientX - bounds.left) * xScale,
        y: (bounds.height - (event.clientY - bounds.top)) * yScale,
      }
    }
    const handlePointerMove = (event: PointerEvent) => {
      const position = pointerPosition(event)
      uniforms.uPointer.value.set(position.x, position.y)
      if (previousPointer) {
        uniforms.uPointerVelocity.value.set(
          (position.x - previousPointer.x) / renderer.domElement.width,
          (position.y - previousPointer.y) / renderer.domElement.height,
        )
      }
      previousPointer = position
    }
    const handlePointerDown = (event: PointerEvent) => {
      const position = pointerPosition(event)
      uniforms.uClickPositions.value[currentClick].set(position.x, position.y)
      uniforms.uClickTimes.value[currentClick] = uniforms.uTime.value
      currentClick = (currentClick + 1) % MAX_CLICKS
    }
    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    container.addEventListener('pointerdown', handlePointerDown, { passive: true })

    let isVisible = true
    const visibilityObserver = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting })
    visibilityObserver.observe(container)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()
    const timeOffset = Math.random() * 1000
    let animationFrame = 0
    const animate = () => {
      if (isVisible) {
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * (reducedMotion ? 0 : speed)
        const wobble = 0.985 + Math.sin(uniforms.uTime.value * liquidWobbleSpeed) * 0.015
        uniforms.uPointerVelocity.value.multiplyScalar(wobble * 0.94)
        renderer.render(scene, camera)
      }
      animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerdown', handlePointerDown)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    }
  }, [color, edgeFade, enableRipples, liquid, liquidRadius, liquidStrength, liquidWobbleSpeed, patternDensity, patternScale, pixelSize, pixelSizeJitter, rippleIntensityScale, rippleSpeed, rippleThickness, speed, transparent])

  return <div ref={containerRef} className={`pixel-blast-container ${className}`} aria-hidden="true" />
}
