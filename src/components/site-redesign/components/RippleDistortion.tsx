'use client'

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import { Geometry, Mesh, Program, RenderTarget, Renderer, Texture, Triangle } from 'ogl'
import './RippleDistortion.css'

/** 单帧可并存的最大波纹数量 */
const MAX_WAVES = 100
/** 位移场相对画布的分辨率倍率 */
const QUALITY_SCALE: Record<RippleQuality, number> = { low: 0.4, medium: 0.7, high: 1 }
/** 波纹初始缩放 */
const START_SCALE = 1.5
/** 波纹寿命衰减常数，保证 fade 秒后衰减到 1/500 */
const LIFE_CONSTANT = Math.log(500)
/** 波纹完全消散后仍需补渲染的帧数，用于清空画布 */
const IDLE_FLUSH_FRAMES = 2
/** 视频帧可用的最低 readyState（HAVE_CURRENT_DATA） */
const VIDEO_READY_STATE = 2

type RippleQuality = 'low' | 'medium' | 'high'

type RippleTrigger = 'hover' | 'click' | 'both'

interface RippleDistortionProps {
  /** 静态纹理地址，视频未就绪前作为兜底画面 */
  readonly src?: string
  /** 实时视频纹理来源，传入后每帧上传视频画面 */
  readonly videoRef?: RefObject<HTMLVideoElement | null>
  readonly brushSize?: number
  readonly strength?: number
  readonly swirl?: number
  readonly rings?: number
  readonly spread?: number
  readonly fade?: number
  readonly spacing?: number
  readonly dispersion?: number
  readonly glint?: number
  readonly tint?: string
  readonly tintAmount?: number
  readonly grayscale?: boolean
  readonly highlightColor?: string
  readonly trigger?: RippleTrigger
  readonly clickStrength?: number
  readonly quality?: RippleQuality
  readonly enabled?: boolean
  readonly className?: string
  readonly style?: CSSProperties
}

interface RippleWave {
  x: number
  y: number
  scale: number
  target: number
  size: number
  opacity: number
}

interface RippleRuntimeConfig {
  brushSize: number
  spread: number
  fade: number
  spacing: number
  clickStrength: number
  trigger: RippleTrigger
  enabled: boolean
}

interface RippleUniforms {
  wave: { uRings: { value: number } }
  composite: Record<string, { value: number | number[] | Texture }>
}

const waveVertex = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
attribute vec2 iOffset;
attribute vec2 iScale;
attribute float iOpacity;
varying vec2 vUv;
varying float vOpacity;
void main() {
  vUv = uv;
  vOpacity = iOpacity;
  gl_Position = vec4(iOffset + position * iScale, 0.0, 1.0);
}`

const waveFragment = `
precision highp float;
varying vec2 vUv;
varying float vOpacity;
uniform float uRings;
const float PI = 3.141592653589793;
const float EDGE = 0.006737947;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = dot(p, p);
  if (r > 1.0) discard;
  float brush = (exp(-r * 5.0) - EDGE) / (1.0 - EDGE);
  brush *= 0.55 + 0.45 * cos(sqrt(r) * PI * 2.0 * uRings);
  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.0);
}`

const screenVertex = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`

const compositeFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uTexel;
uniform vec3 uTint;
uniform vec3 uHighlight;
uniform float uStrength;
uniform float uSwirl;
uniform float uDispersion;
uniform float uGlint;
uniform float uTintAmount;
uniform float uGrayscale;
const float TAU = 6.283185307179586;
vec2 coverUV(vec2 uv) {
  vec2 safe = max(uTextureSize, vec2(1.0));
  vec2 s = uResolution / safe;
  vec2 scaledSize = safe * max(s.x, s.y);
  vec2 offset = (uResolution - scaledSize) * 0.5;
  return (uv * uResolution - offset) / scaledSize;
}
void main() {
  float amount = texture2D(uDisplacement, vUv).r;
  vec2 base = coverUV(vUv);
  float theta = amount * uSwirl * TAU;
  vec2 dir = vec2(sin(theta), cos(theta));
  vec2 push = dir * amount * uStrength;
  vec3 color;
  if (uDispersion > 0.001) {
    float split = uDispersion * 0.25;
    color.r = texture2D(uTexture, base + push * (1.0 + split)).r;
    color.g = texture2D(uTexture, base + push).g;
    color.b = texture2D(uTexture, base + push * (1.0 - split)).b;
  } else {
    color = texture2D(uTexture, base + push).rgb;
  }
  if (uGrayscale > 0.001) {
    color = mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), uGrayscale);
  }
  if (uTintAmount > 0.001) {
    color = mix(color, color * uTint * 1.9, clamp(amount * 1.6, 0.0, 1.0) * uTintAmount);
  }
  if (uGlint > 0.001) {
    float ex = texture2D(uDisplacement, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDisplacement, vUv - vec2(uTexel.x, 0.0)).r;
    float ey = texture2D(uDisplacement, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDisplacement, vUv - vec2(0.0, uTexel.y)).r;
    vec3 normal = normalize(vec3(-ex * 26.0, -ey * 26.0, 1.0));
    vec3 light = normalize(vec3(-0.35, 0.55, 1.0));
    float raw = pow(max(dot(normal, light), 0.0), 22.0);
    float flatSpec = pow(max(light.z, 0.0), 22.0);
    color += uHighlight * clamp((raw - flatSpec) / max(1.0 - flatSpec, 0.0001), 0.0, 1.0) * uGlint;
  }
  // 无扰动区域保持透明，露出下层原始视频；扰动处呈现液态玻璃折射
  float glass = clamp(amount * 2.4, 0.0, 0.88);
  gl_FragColor = vec4(color, glass);
}`

/**
 * 十六进制色值转 0~1 区间的 RGB 三元组
 */
const hexToRGB = (hex: string): number[] => {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map(char => char + char).join('') : clean
  const parsed = Number.parseInt(full, 16)
  if (Number.isNaN(parsed)) return [1, 1, 1]
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255]
}

/**
 * 液态玻璃涟漪扰动层：以图片或实时视频为纹理，跟随指针产生折射波纹
 */
export default function RippleDistortion({
  src = '/gray-texture.png',
  videoRef,
  brushSize = 150,
  strength = 0.2,
  swirl = 1,
  rings = 4,
  spread = 5,
  fade = 3,
  spacing = 15,
  dispersion = 0,
  glint = 0,
  tint = '#a855f7',
  tintAmount = 0.1,
  grayscale = true,
  highlightColor = '#ffffff',
  trigger = 'hover',
  clickStrength = 2,
  quality = 'low',
  enabled = true,
  className = '',
  style = undefined,
}: RippleDistortionProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const configRef = useRef<RippleRuntimeConfig>({ brushSize, spread, fade, spacing, clickStrength, trigger, enabled })
  const uniformsRef = useRef<RippleUniforms | null>(null)
  configRef.current = { brushSize, spread, fade, spacing, clickStrength, trigger, enabled }

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    const canvas = gl.canvas
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    mount.appendChild(canvas)

    const imageTexture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE })
    let disposed = false
    let textureWidth = 1
    let textureHeight = 1
    const image = new window.Image()
    image.crossOrigin = 'anonymous'
    image.decoding = 'async'
    image.onload = () => {
      // 视频纹理一旦接管就不再回退到静态图
      if (disposed || imageTexture.image instanceof HTMLVideoElement) return
      imageTexture.image = image
      textureWidth = image.naturalWidth || 1
      textureHeight = image.naturalHeight || 1
      compositeUniforms.uTextureSize.value = [textureWidth, textureHeight]
    }
    image.src = src

    const offsets = new Float32Array(MAX_WAVES * 2)
    const scales = new Float32Array(MAX_WAVES * 2)
    const opacities = new Float32Array(MAX_WAVES)
    const waves: RippleWave[] = Array.from({ length: MAX_WAVES }, () => ({ x: 0, y: 0, scale: START_SCALE, target: START_SCALE, size: 1, opacity: 0 }))
    let current = 0
    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]) },
      uv: { size: 2, data: new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]) },
      iOffset: { instanced: 1, size: 2, data: offsets },
      iScale: { instanced: 1, size: 2, data: scales },
      iOpacity: { instanced: 1, size: 1, data: opacities },
    })
    const waveUniforms = { uRings: { value: rings } }
    const waveProgram = new Program(gl, { vertex: waveVertex, fragment: waveFragment, uniforms: waveUniforms, transparent: true, depthTest: false, depthWrite: false, cullFace: false })
    waveProgram.setBlendFunc(gl.ONE, gl.ONE)
    const waveMesh = new Mesh(gl, { geometry, program: waveProgram, frustumCulled: false })
    const displacementTarget = new RenderTarget(gl, { width: 2, height: 2, depth: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE })
    const compositeUniforms: RippleUniforms['composite'] = {
      uTexture: { value: imageTexture },
      uDisplacement: { value: displacementTarget.texture },
      uResolution: { value: [1, 1] },
      uTextureSize: { value: [1, 1] },
      uTexel: { value: [1, 1] },
      uTint: { value: hexToRGB(tint) },
      uHighlight: { value: hexToRGB(highlightColor) },
      uStrength: { value: strength },
      uSwirl: { value: swirl },
      uDispersion: { value: dispersion },
      uGlint: { value: glint },
      uTintAmount: { value: tintAmount },
      uGrayscale: { value: grayscale ? 1 : 0 },
    }
    const compositeProgram = new Program(gl, { vertex: screenVertex, fragment: compositeFragment, uniforms: compositeUniforms, transparent: true, depthTest: false, depthWrite: false })
    const compositeMesh = new Mesh(gl, { geometry: new Triangle(gl), program: compositeProgram })
    uniformsRef.current = { wave: waveUniforms, composite: compositeUniforms }

    let width = 1
    let height = 1
    const resize = (): void => {
      width = Math.max(1, mount.clientWidth)
      height = Math.max(1, mount.clientHeight)
      renderer.setSize(width, height)
      compositeUniforms.uResolution.value = [width, height]
      const scale = QUALITY_SCALE[quality]
      const fieldWidth = Math.max(2, Math.round(width * scale))
      const fieldHeight = Math.max(2, Math.round(height * scale))
      displacementTarget.setSize(fieldWidth, fieldHeight)
      compositeUniforms.uTexel.value = [1 / fieldWidth, 1 / fieldHeight]
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()

    const uploadVideoFrame = (): void => {
      const video = videoRef?.current
      if (!video || video.readyState < VIDEO_READY_STATE || video.videoWidth === 0) return
      if (imageTexture.image !== video) imageTexture.image = video
      imageTexture.needsUpdate = true
      if (textureWidth === video.videoWidth && textureHeight === video.videoHeight) return
      textureWidth = video.videoWidth
      textureHeight = video.videoHeight
      compositeUniforms.uTextureSize.value = [textureWidth, textureHeight]
    }
    const setNewWave = (x: number, y: number, power: number): void => {
      const config = configRef.current
      const wave = waves[current]
      current = (current + 1) % MAX_WAVES
      wave.x = x
      wave.y = y
      wave.scale = START_SCALE * power
      wave.target = START_SCALE * Math.max(1, config.spread) * power
      wave.size = Math.max(1, config.brushSize)
      wave.opacity = 1
    }
    const localPoint = (clientX: number, clientY: number): [number, number] | null => {
      const rect = mount.getBoundingClientRect()
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null
      return [clientX - rect.left, rect.height - (clientY - rect.top)]
    }
    let previousX = 0
    let previousY = 0
    const onMove = (event: PointerEvent): void => {
      const config = configRef.current
      if (!config.enabled || reduceMotion || config.trigger === 'click') return
      const point = localPoint(event.clientX, event.clientY)
      if (!point) return
      const step = Math.max(1, config.spacing)
      if (Math.abs(point[0] - previousX) <= step && Math.abs(point[1] - previousY) <= step) return
      setNewWave(point[0], point[1], 1)
      previousX = point[0]
      previousY = point[1]
    }
    const onDown = (event: PointerEvent): void => {
      const config = configRef.current
      if (!config.enabled || reduceMotion || config.trigger === 'hover') return
      const point = localPoint(event.clientX, event.clientY)
      if (point) setNewWave(point[0], point[1], Math.max(1, config.clickStrength))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })

    let frame = 0
    let previousTime = 0
    let idleFrames = IDLE_FLUSH_FRAMES
    const loop = (now: number): void => {
      frame = requestAnimationFrame(loop)
      const delta = previousTime ? Math.min(0.05, (now - previousTime) / 1000) : 0
      previousTime = now
      const config = configRef.current
      const growth = reduceMotion ? 0 : 1 - Math.exp(-delta * 1.09)
      const decay = reduceMotion ? 1 : Math.exp((-delta * LIFE_CONSTANT) / Math.max(0.15, config.fade))
      let activeCount = 0
      for (let index = 0; index < MAX_WAVES; index += 1) {
        const wave = waves[index]
        if (wave.opacity <= 0) { opacities[index] = 0; continue }
        wave.opacity *= decay
        wave.scale += (wave.target - wave.scale) * growth
        if (wave.opacity < 0.002) { wave.opacity = 0; opacities[index] = 0; continue }
        const half = (wave.scale * wave.size) / 2
        offsets[index * 2] = (wave.x / width) * 2 - 1
        offsets[index * 2 + 1] = (wave.y / height) * 2 - 1
        scales[index * 2] = (half / width) * 2
        scales[index * 2 + 1] = (half / height) * 2
        opacities[index] = wave.opacity
        activeCount += 1
      }
      // 无波纹时跳过取帧与合成，静止状态下不产生 GPU 开销
      idleFrames = activeCount > 0 ? 0 : idleFrames + 1
      if (idleFrames > IDLE_FLUSH_FRAMES) return
      uploadVideoFrame()
      geometry.attributes.iOffset.needsUpdate = true
      geometry.attributes.iScale.needsUpdate = true
      geometry.attributes.iOpacity.needsUpdate = true
      renderer.render({ scene: waveMesh, target: displacementTarget, clear: true })
      renderer.render({ scene: compositeMesh })
    }
    frame = requestAnimationFrame(loop)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      uniformsRef.current = null
      imageTexture.image = undefined
      if (canvas.parentNode === mount) mount.removeChild(canvas)
      const loseContext = gl.getExtension('WEBGL_lose_context') as WEBGL_lose_context | null
      loseContext?.loseContext()
    }
  }, [src, quality, videoRef])

  useEffect(() => {
    const uniforms = uniformsRef.current
    if (!uniforms) return
    uniforms.wave.uRings.value = rings
    uniforms.composite.uStrength.value = strength
    uniforms.composite.uSwirl.value = swirl
    uniforms.composite.uDispersion.value = dispersion
    uniforms.composite.uGlint.value = glint
    uniforms.composite.uTintAmount.value = tintAmount
    uniforms.composite.uGrayscale.value = grayscale ? 1 : 0
    uniforms.composite.uHighlight.value = hexToRGB(highlightColor)
    uniforms.composite.uTint.value = hexToRGB(tint)
  }, [rings, strength, swirl, dispersion, glint, tintAmount, grayscale, highlightColor, tint])

  return <div ref={mountRef} className={`ripple-distortion ${className}`.trim()} style={style} />
}
