// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './LightRays.css'

type RaysOrigin = 'top-center' | 'top-left' | 'top-right' | 'right' | 'left' | 'bottom-center' | 'bottom-right' | 'bottom-left'

type LightRaysProps = {
  raysOrigin?: RaysOrigin
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  pulsating?: boolean
  fadeDistance?: number
  saturation?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
  className?: string
}

const hexToRgb = (hex: string) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return match ? [Number.parseInt(match[1], 16) / 255, Number.parseInt(match[2], 16) / 255, Number.parseInt(match[3], 16) / 255] : [1, 1, 1]
}

const getAnchorAndDirection = (origin: RaysOrigin, width: number, height: number) => {
  const outside = 0.2
  switch (origin) {
    case 'top-left': return { anchor: [0, -outside * height], direction: [0, 1] }
    case 'top-right': return { anchor: [width, -outside * height], direction: [0, 1] }
    case 'left': return { anchor: [-outside * width, height * 0.5], direction: [1, 0] }
    case 'right': return { anchor: [width * (1 + outside), height * 0.5], direction: [-1, 0] }
    case 'bottom-left': return { anchor: [0, height * (1 + outside)], direction: [0, -1] }
    case 'bottom-center': return { anchor: [width * 0.5, height * (1 + outside)], direction: [0, -1] }
    case 'bottom-right': return { anchor: [width, height * (1 + outside)], direction: [0, -1] }
    default: return { anchor: [width * 0.5, -outside * height], direction: [0, 1] }
  }
}

const vertexShader = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(vec2 source, vec2 reference, vec2 coord, float seedA, float seedB, float speed) {
  vec2 delta = coord - source;
  float cosine = dot(normalize(delta), reference);
  float angle = cosine + distortion * sin(iTime * 2.0 + length(delta) * 0.01) * 0.2;
  float spread = pow(max(angle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(delta);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
  float strength = clamp((0.45 + 0.15 * sin(angle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-angle * seedB + iTime * speed)), 0.0, 1.0);
  return strength * lengthFalloff * fadeFalloff * spread * pulse;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  vec2 finalDirection = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseDirection = normalize(mousePos * iResolution.xy - rayPos);
    finalDirection = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }
  vec4 rayOne = vec4(1.0) * rayStrength(rayPos, finalDirection, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rayTwo = vec4(1.0) * rayStrength(rayPos, finalDirection, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
  vec4 color = rayOne * 0.5 + rayTwo * 0.4;
  if (noiseAmount > 0.0) {
    float grain = noise(coord * 0.01 + iTime * 0.1);
    color.rgb *= 1.0 - noiseAmount + noiseAmount * grain;
  }
  float brightness = 1.0 - coord.y / iResolution.y;
  color.x *= 0.1 + brightness * 0.8;
  color.y *= 0.3 + brightness * 0.6;
  color.z *= 0.5 + brightness * 0.5;
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, saturation) * raysColor;
  color.a = max(color.r, max(color.g, color.b));
  gl_FragColor = color;
}
`

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 1,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = false,
  mouseInfluence = 0.5,
  noiseAmount = 0,
  distortion = 0,
  className = '',
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true })
    const gl = renderer.gl
    gl.canvas.style.width = '100%'
    gl.canvas.style.height = '100%'
    gl.canvas.setAttribute('aria-hidden', 'true')
    container.replaceChildren(gl.canvas)

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion },
    }
    const geometry = new Triangle(gl)
    const program = new Program(gl, { vertex: vertexShader, fragment: fragmentShader, uniforms })
    const mesh = new Mesh(gl, { geometry, program })
    const mouse = { x: 0.5, y: 0.5 }
    const smoothMouse = { x: 0.5, y: 0.5 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let visible = true

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)
      renderer.setSize(width, height)
      const renderWidth = width * renderer.dpr
      const renderHeight = height * renderer.dpr
      uniforms.iResolution.value = [renderWidth, renderHeight]
      const placement = getAnchorAndDirection(raysOrigin, renderWidth, renderHeight)
      uniforms.rayPos.value = placement.anchor
      uniforms.rayDir.value = placement.direction
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = (event.clientX - rect.left) / Math.max(rect.width, 1)
      mouse.y = (event.clientY - rect.top) / Math.max(rect.height, 1)
    }

    const render = (time: number) => {
      if (visible) {
        uniforms.iTime.value = reducedMotion ? 0 : time * 0.001
        if (followMouse && mouseInfluence > 0) {
          smoothMouse.x = smoothMouse.x * 0.92 + mouse.x * 0.08
          smoothMouse.y = smoothMouse.y * 0.92 + mouse.y * 0.08
          uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y]
        }
        renderer.render({ scene: mesh })
      }
      animationFrame = window.requestAnimationFrame(render)
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0.1 })
    const resizeObserver = new ResizeObserver(resize)
    visibilityObserver.observe(container)
    resizeObserver.observe(container)
    if (followMouse) window.addEventListener('pointermove', onPointerMove, { passive: true })
    resize()
    animationFrame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      if (followMouse) window.removeEventListener('pointermove', onPointerMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      gl.canvas.remove()
    }
  }, [distortion, fadeDistance, followMouse, lightSpread, mouseInfluence, noiseAmount, pulsating, rayLength, raysColor, raysOrigin, raysSpeed, saturation])

  return <div ref={containerRef} className={`light-rays-container ${className}`.trim()} aria-hidden="true" />
}
