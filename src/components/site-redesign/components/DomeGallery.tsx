// @ts-nocheck
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useGesture } from '@use-gesture/react'
import './DomeGallery.css'

export type DomeGalleryImage = {
  src: string
  alt?: string
}

type DomeGalleryProps = {
  images: DomeGalleryImage[]
  fit?: number
  minRadius?: number
  maxRadius?: number
  overlayBlurColor?: string
  dragSensitivity?: number
  segments?: number
  grayscale?: boolean
  imageBorderRadius?: string
  transitionKey?: string
}

type Rotation = { x: number; y: number }

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function buildItems(images: DomeGalleryImage[], segments: number) {
  const columns = Array.from({ length: segments }, (_, index) => -37 + index * 2)
  const evenRows = [-4, -2, 0, 2, 4]
  const oddRows = [-3, -1, 1, 3, 5]
  const coordinates = columns.flatMap((x, column) =>
    (column % 2 === 0 ? evenRows : oddRows).map((y) => ({ x, y, sizeX: 2, sizeY: 2 })),
  )

  if (!images.length) return []

  return coordinates.map((coordinate, index) => ({
    ...coordinate,
    ...images[index % images.length],
  }))
}

export default function DomeGallery({
  images,
  fit = 0.54,
  minRadius = 560,
  maxRadius = 980,
  overlayBlurColor = '#1a1a1a',
  dragSensitivity = 20,
  segments = 35,
  grayscale = false,
  imageBorderRadius = '18px',
  transitionKey = 'all',
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef<Rotation>({ x: 0, y: 0 })
  const startRotationRef = useRef<Rotation>({ x: 0, y: 0 })
  const inertiaRef = useRef<number | null>(null)
  const transitionTimeoutRef = useRef<number | null>(null)
  const dragDistanceRef = useRef(0)
  const lastDragAtRef = useRef(0)
  const [openedImage, setOpenedImage] = useState<DomeGalleryImage | null>(null)
  const items = useMemo(() => buildItems(images, segments), [images, segments])

  const applyRotation = useCallback((rotation: Rotation) => {
    rotationRef.current = rotation
    if (sphereRef.current) {
      sphereRef.current.style.transform =
        `translateZ(calc(var(--radius) * -1)) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
    }
  }, [])

  const stopInertia = useCallback(() => {
    if (inertiaRef.current !== null) cancelAnimationFrame(inertiaRef.current)
    inertiaRef.current = null
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.max(1, entry.contentRect.width)
      const height = Math.max(1, entry.contentRect.height)
      const radius = clamp(Math.min(width * fit, height * 1.35), minRadius, maxRadius)
      root.style.setProperty('--radius', `${Math.round(radius)}px`)
      applyRotation(rotationRef.current)
    })

    resizeObserver.observe(root)
    return () => resizeObserver.disconnect()
  }, [applyRotation, fit, maxRadius, minRadius])

  useEffect(() => {
    const root = rootRef.current
    const sphere = sphereRef.current
    if (!root || !sphere) return

    root.dataset.switching = 'true'
    sphere.style.transition = 'transform 760ms cubic-bezier(.2,.75,.2,1)'
    applyRotation({ x: 0, y: rotationRef.current.y + 28 })

    if (transitionTimeoutRef.current !== null) window.clearTimeout(transitionTimeoutRef.current)
    transitionTimeoutRef.current = window.setTimeout(() => {
      root.dataset.switching = 'false'
      sphere.style.transition = ''
    }, 780)

    return () => {
      if (transitionTimeoutRef.current !== null) window.clearTimeout(transitionTimeoutRef.current)
    }
  }, [applyRotation, transitionKey])

  useGesture(
    {
      onDragStart: () => {
        stopInertia()
        dragDistanceRef.current = 0
        startRotationRef.current = { ...rotationRef.current }
      },
      onDrag: ({ movement: [movementX, movementY], last, velocity: [velocityX, velocityY], direction }) => {
        dragDistanceRef.current = Math.hypot(movementX, movementY)
        const next = {
          x: clamp(startRotationRef.current.x - movementY / dragSensitivity, -6, 6),
          y: startRotationRef.current.y + movementX / dragSensitivity,
        }
        applyRotation(next)

        if (last) {
          if (dragDistanceRef.current > 8) lastDragAtRef.current = performance.now()
          let vx = velocityX * direction[0] * 34
          let vy = velocityY * direction[1] * 12
          const tick = () => {
            vx *= 0.94
            vy *= 0.9
            if (Math.abs(vx) < 0.02 && Math.abs(vy) < 0.02) {
              inertiaRef.current = null
              return
            }
            applyRotation({
              x: clamp(rotationRef.current.x - vy / 30, -6, 6),
              y: rotationRef.current.y + vx / 30,
            })
            inertiaRef.current = requestAnimationFrame(tick)
          }
          inertiaRef.current = requestAnimationFrame(tick)
        }
      },
      onWheel: ({ delta: [deltaX, deltaY], event }) => {
        if (Math.abs(deltaX) <= Math.abs(deltaY) && !event.shiftKey) return
        event.preventDefault()
        applyRotation({
          x: rotationRef.current.x,
          y: rotationRef.current.y - (deltaX || deltaY) / 24,
        })
      },
    },
    {
      target: mainRef,
      eventOptions: { passive: false },
      wheel: { eventOptions: { passive: false } },
    },
  )

  useEffect(() => () => stopInertia(), [stopInertia])

  useEffect(() => {
    if (!openedImage) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedImage(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [openedImage])

  const openImage = (image: DomeGalleryImage) => {
    if (dragDistanceRef.current > 8 || performance.now() - lastDragAtRef.current < 120) return
    stopInertia()
    setOpenedImage(image)
  }

  return (
    <div
      ref={rootRef}
      className="dome-gallery"
      style={{
        '--segments-x': segments,
        '--segments-y': segments,
        '--overlay-blur-color': overlayBlurColor,
        '--tile-radius': imageBorderRadius,
        '--image-filter': grayscale ? 'grayscale(1)' : 'none',
      } as React.CSSProperties}
    >
      <main ref={mainRef} className="dome-gallery__main" aria-label="Interactive community photo wall">
        <div className="dome-gallery__stage">
          <div ref={sphereRef} className="dome-gallery__sphere">
            {items.map((item, index) => (
              <div
                className="dome-gallery__item"
                key={`${transitionKey}-${item.x}-${item.y}-${index}`}
                style={{
                  '--offset-x': item.x,
                  '--offset-y': item.y,
                  '--item-size-x': item.sizeX,
                  '--item-size-y': item.sizeY,
                } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="dome-gallery__image"
                  aria-label={`Open original image: ${item.alt || 'community photo'}`}
                  onClick={() => openImage(item)}
                >
                  <img src={item.src} alt={item.alt || ''} draggable={false} loading={index < 25 ? 'eager' : 'lazy'} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="dome-gallery__overlay" aria-hidden="true" />
        <div className="dome-gallery__overlay dome-gallery__overlay--blur" aria-hidden="true" />
        <div className="dome-gallery__fade dome-gallery__fade--top" aria-hidden="true" />
        <div className="dome-gallery__fade dome-gallery__fade--bottom" aria-hidden="true" />
        <p className="dome-gallery__hint">Drag or shift-scroll to explore</p>
      </main>
      {openedImage && createPortal(
        <div className="dome-gallery-lightbox" role="dialog" aria-modal="true" aria-label="Original community photo" onClick={() => setOpenedImage(null)}>
          <button type="button" className="dome-gallery-lightbox__close" aria-label="Close original image" onClick={() => setOpenedImage(null)}>×</button>
          <figure className="dome-gallery-lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img src={openedImage.src} alt={openedImage.alt || 'Community event'} />
          </figure>
        </div>,
        document.body,
      )}
    </div>
  )
}
