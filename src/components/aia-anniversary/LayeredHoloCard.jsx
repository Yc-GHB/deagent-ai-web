'use client'
/* eslint-disable @next/next/no-img-element, react-hooks/exhaustive-deps -- renderer callbacks intentionally use refs */

import { useEffect, useRef, useState } from 'react'
import { createCardRenderer } from './holoRenderer'

const assetUrl = path => `/aia-anniversary/assets/${path}`
const DEFAULT_LAYERS = Object.freeze({
  background: assetUrl('holo/aia-background.png'),
  character: assetUrl('holo/aia-character.png'),
  ui: assetUrl('holo/aia-ui.png'),
  structure: assetUrl('holo/aia-structure.png'),
})

export default function LayeredHoloCard({
  artworkUrl,
  artworkAlt = '',
  artworkFit = 'cover',
  surface = 'front',
  layered,
  layers,
  depth,
  contourGlow,
  generated,
  recenterKey,
  motionEnabled = false,
}) {
  const activeLayers = layers || DEFAULT_LAYERS
  const cardRef = useRef(null)
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const animationRef = useRef(0)
  const motionRef = useRef({ x: -0.315, y: 0.165, targetX: -0.315, targetY: 0.165 })
  const depthRef = useRef(depth)
  const contourGlowRef = useRef(contourGlow)
  const recenterStateRef = useRef({ recenterKey, artworkUrl })
  const orientationBaselineRef = useRef(null)
  const pointerActiveRef = useRef(false)
  const pointerOverrideUntilRef = useRef(0)
  const [rendererMode, setRendererMode] = useState(layered ? 'loading' : 'fallback')
  depthRef.current = depth
  contourGlowRef.current = contourGlow

  function paint() {
    const card = cardRef.current
    if (!card) {return}
    const motion = motionRef.current
    motion.x += (motion.targetX - motion.x) * 0.115
    motion.y += (motion.targetY - motion.y) * 0.115

    const x = motion.x
    const y = motion.y
    const activeDepth = depthRef.current
    const positiveDepth = Math.max(activeDepth, 0)
    const rotateX = -y * 30
    const rotateY = x * 38
    card.style.setProperty('--holo-rotate-x', `${rotateX}deg`)
    card.style.setProperty('--holo-rotate-y', `${rotateY}deg`)
    card.style.setProperty('--holo-bg-x', `${x * 13}%`)
    card.style.setProperty('--holo-bg-y', `${y * 13}%`)
    card.style.setProperty('--holo-character-x', `${x * activeDepth * 8}%`)
    card.style.setProperty('--holo-character-y', `${y * activeDepth * 8}%`)
    card.style.setProperty('--holo-ui-x', `${x * positiveDepth * 12}%`)
    card.style.setProperty('--holo-ui-y', `${y * positiveDepth * 12}%`)
    card.style.setProperty('--holo-pointer-x', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--holo-pointer-y', `${(y + 0.5) * 100}%`)
    card.style.setProperty('--holo-spectrum-shift', `${(x + y) * 150}deg`)

    if (rendererRef.current) {
      try {
        rendererRef.current.draw(rotateX, rotateY, 1, activeDepth, contourGlowRef.current)
      } catch {
        rendererRef.current.dispose()
        rendererRef.current = null
        setRendererMode('fallback')
      }
    }

    const moving = Math.abs(motion.targetX - x) + Math.abs(motion.targetY - y) > 0.001
    animationRef.current = moving ? requestAnimationFrame(paint) : 0
  }

  function aim(x, y) {
    motionRef.current.targetX = x
    motionRef.current.targetY = y
    if (!animationRef.current) {animationRef.current = requestAnimationFrame(paint)}
  }

  useEffect(() => {
    if (!animationRef.current) {animationRef.current = requestAnimationFrame(paint)}
  }, [depth, contourGlow])

  useEffect(() => {
    const previous = recenterStateRef.current
    if (previous.recenterKey === recenterKey && previous.artworkUrl === artworkUrl) {return}
    recenterStateRef.current = { recenterKey, artworkUrl }
    orientationBaselineRef.current = null
    aim(0, 0)
  }, [recenterKey, artworkUrl])

  useEffect(() => {
    orientationBaselineRef.current = null
    if (!motionEnabled) {aim(0, 0)}
  }, [motionEnabled])

  useEffect(() => {
    let active = true
    let instance = null

    if (!layered || !canvasRef.current) {
      setRendererMode('fallback')
      return undefined
    }

    setRendererMode('loading')
    Promise.resolve(active ? createCardRenderer(canvasRef.current, activeLayers) : null)
      .then(nextRenderer => {
        if (!nextRenderer) {return}
        if (!active) {
          nextRenderer.dispose()
          return
        }
        instance = nextRenderer
        rendererRef.current = nextRenderer
        setRendererMode('webgl')
        const motion = motionRef.current
        nextRenderer.draw(-motion.y * 30, motion.x * 38, 1, depthRef.current, contourGlowRef.current)
      })
      .catch(() => {
        if (active) {setRendererMode('fallback')}
      })

    return () => {
      active = false
      if (rendererRef.current === instance) {rendererRef.current = null}
      instance?.dispose()
    }
  }, [layered, activeLayers.background, activeLayers.character, activeLayers.ui, activeLayers.structure])

  useEffect(() => {
    const trackPointer = event => {
      const card = cardRef.current
      if (!card) {return}
      const rect = card.getBoundingClientRect()
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
      if (!inside) {return}
      const motionScale = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.45 : 1
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)) * motionScale
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)) * motionScale
      aim(x, y)
    }
    window.addEventListener('pointermove', trackPointer, { capture: true, passive: true })
    window.addEventListener('mousemove', trackPointer, { capture: true, passive: true })
    return () => {
      window.removeEventListener('pointermove', trackPointer, { capture: true })
      window.removeEventListener('mousemove', trackPointer, { capture: true })
    }
  }, [])

  useEffect(() => {
    if (!motionEnabled || typeof window === 'undefined' || !window.DeviceOrientationEvent) {return undefined}

    const clamp = value => Math.max(-0.5, Math.min(0.5, value))
    const shortestAngle = (value, baseline) => ((value - baseline + 540) % 360) - 180
    const readScreenAngle = () => {
      const angle = window.screen?.orientation?.angle
      if (typeof angle === 'number') {return ((angle % 360) + 360) % 360}
      const legacyAngle = Number(window.orientation || 0)
      return ((legacyAngle % 360) + 360) % 360
    }
    const mapOrientation = (beta, gamma, angle) => {
      if (angle === 90) {return { horizontal: beta, vertical: -gamma }}
      if (angle === 180) {return { horizontal: -gamma, vertical: -beta }}
      if (angle === 270) {return { horizontal: -beta, vertical: gamma }}
      return { horizontal: gamma, vertical: beta }
    }
    const resetOrientation = () => {
      orientationBaselineRef.current = null
    }
    const handleOrientation = event => {
      if (event.beta == null || event.gamma == null) {return}
      if (pointerActiveRef.current || performance.now() < pointerOverrideUntilRef.current) {return}

      const angle = readScreenAngle()
      const current = mapOrientation(event.beta, event.gamma, angle)
      const baseline = orientationBaselineRef.current
      if (!baseline || baseline.angle !== angle) {
        orientationBaselineRef.current = { ...current, angle }
        return
      }

      const motionScale = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.35 : 1
      const x = clamp(shortestAngle(current.horizontal, baseline.horizontal) / 50) * motionScale
      const y = clamp(shortestAngle(current.vertical, baseline.vertical) / 60) * motionScale
      aim(x, y)
    }

    window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    window.screen?.orientation?.addEventListener?.('change', resetOrientation)
    window.addEventListener('orientationchange', resetOrientation)
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.screen?.orientation?.removeEventListener?.('change', resetOrientation)
      window.removeEventListener('orientationchange', resetOrientation)
    }
  }, [motionEnabled, recenterKey])

  useEffect(() => () => {
    if (animationRef.current) {cancelAnimationFrame(animationRef.current)}
    animationRef.current = 0
  }, [])

  function handlePointerMove(event) {
    pointerOverrideUntilRef.current = performance.now() + 700
    const rect = event.currentTarget.getBoundingClientRect()
    const motionScale = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.45 : 1
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)) * motionScale
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)) * motionScale
    aim(x, y)
  }

  function handlePointerDown() {
    pointerActiveRef.current = true
    pointerOverrideUntilRef.current = performance.now() + 700
  }

  function handlePointerEnd() {
    pointerActiveRef.current = false
    pointerOverrideUntilRef.current = performance.now() + 550
    if (!motionEnabled) {aim(0, 0)}
  }

  return (
    <div
      ref={cardRef}
      className={`layered-holo-card is-${surface}${generated ? ' is-active' : ''}${layered ? ' has-layers' : ' is-single-image'}${rendererMode === 'webgl' ? ' is-webgl-ready' : ''}`}
      data-renderer={rendererMode}
      style={{
        '--holo-contour-opacity': Math.min(0.9, contourGlow * 0.25),
        '--holo-contour-bloom-opacity': Math.min(0.65, contourGlow * 0.18),
        '--holo-contour-core-opacity': Math.min(0.5, contourGlow * 0.14),
        '--holo-contour-blur': `${2 + contourGlow * 7}px`,
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
    >
      <div className='holo-card-window'>
        {layered ? (
          <img className='holo-layer holo-background' src={activeLayers.background} alt='' draggable='false' />
        ) : (
          <img
            className={`holo-layer holo-uploaded-art${artworkFit === 'contain' ? ' is-contain' : ''}`}
            src={artworkUrl}
            alt={artworkAlt}
            draggable='false'
          />
        )}
        <div className='holo-foil' aria-hidden='true' />
        <div className='holo-grain' aria-hidden='true' />
      </div>

      {layered && (
        <>
          <img className='holo-layer holo-character' src={activeLayers.character} alt='AIA BaBa with an anniversary cake' draggable='false' />
          <div
            className='holo-character-foil'
            aria-hidden='true'
            style={{
              WebkitMaskImage: `url(${activeLayers.character})`,
              maskImage: `url(${activeLayers.character})`,
            }}
          />
          <img className='holo-layer holo-contour holo-contour-bloom' src={activeLayers.structure} alt='' draggable='false' />
          <img className='holo-layer holo-contour holo-contour-core' src={activeLayers.structure} alt='' draggable='false' />
          <img className='holo-layer holo-ui-layer' src={activeLayers.ui} alt='' draggable='false' />
        </>
      )}

      <div className='holo-idle-sheen' aria-hidden='true' />
      <div className='holo-glare' aria-hidden='true' />
      <div className='holo-rim' aria-hidden='true' />
      {layered && <canvas ref={canvasRef} className='holo-webgl-canvas' aria-hidden='true' />}
    </div>
  )
}
