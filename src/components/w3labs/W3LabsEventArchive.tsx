'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Maximize2, X } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import type { Messages } from '@/i18n/messages/types'
import { formatW3LabsCopy } from './format-w3labs-copy'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type GalleryVariant = 'szhk' | 'eurasia' | 'reel'
type W3LabsArchiveCopy = Messages['w3labs']['archive']
type W3LabsEventCards = Messages['w3labs']['eventCards']
type CommunityEvent = {
  id: string
  title: string
  lines: readonly string[]
  photos: string[]
  variant: GalleryVariant
}
type LightboxState = { title: string; frame: number; total: number; src: string } | null

const EVENT_PHOTOS: Record<string, string[]> = {
  'szhk-web3': [
    '/events/szhk-web3/05.jpg',
    '/events/szhk-web3/06.jpg',
    '/events/szhk-web3/01.jpg',
    '/events/design-wall/01.jpg',
  ],
  'hichuang-eurasia-meetup': [
    '/events/hichuang-eurasia-meetup/04.jpg',
    '/events/hichuang-eurasia-meetup/01.jpg',
    '/events/hichuang-eurasia-meetup/03.jpg',
    '/events/hichuang-eurasia-meetup/02.jpg',
  ],
  'hichuang-raccoon-ai-shanghai': [
    '/events/hichuang-raccoon-ai-shanghai/02.jpg',
    '/events/hichuang-raccoon-ai-shanghai/06.jpg',
    '/events/hichuang-raccoon-ai-shanghai/05.jpg',
  ],
}

/**
 * 用当前语言文案组装活动章节数据。
 */
function buildCommunityEvents(cards: W3LabsEventCards): CommunityEvent[] {
  return [
    {
      id: 'szhk-web3',
      title: cards.szhkWeb3.title,
      variant: 'szhk',
      lines: cards.szhkWeb3.lines,
      photos: EVENT_PHOTOS['szhk-web3'],
    },
    {
      id: 'hichuang-eurasia-meetup',
      title: cards.hichuangEurasia.title,
      variant: 'eurasia',
      lines: cards.hichuangEurasia.lines,
      photos: EVENT_PHOTOS['hichuang-eurasia-meetup'],
    },
    {
      id: 'hichuang-raccoon-ai-shanghai',
      title: cards.hichuangRaccoonAi.title,
      variant: 'reel',
      lines: cards.hichuangRaccoonAi.lines,
      photos: EVENT_PHOTOS['hichuang-raccoon-ai-shanghai'],
    },
  ]
}

const wallColumns = [
  ['/events/design-wall/01.jpg', '/events/design-wall/02.jpg', '/events/design-wall/03.jpg'],
  ['/events/design-wall/04.jpg', '/events/design-wall/05.jpg', '/events/design-wall/06.jpg'],
  ['/events/design-wall/07.jpg', '/events/design-wall/08.jpg', '/events/design-wall/09.jpg'],
  ['/events/design-wall/10.jpg', '/events/szhk-web3/04.jpg', '/events/hichuang-eurasia-meetup/02.jpg'],
  ['/events/design-wall/11.jpg', '/events/design-wall/12.jpg', '/events/design-wall/13.jpg'],
]

const wallPhotos = wallColumns.flat()
const wallStackCount = 20
const wallRows = 3
const wallAngleStep = Math.PI / 10

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function wrapAngle(value: number) {
  const turn = Math.PI * 2
  let wrapped = value % turn
  if (wrapped < 0) wrapped += turn
  return wrapped
}

function shortestAngle(value: number) {
  const turn = Math.PI * 2
  let wrapped = value
  while (wrapped > turn / 2) wrapped -= turn
  while (wrapped < -turn / 2) wrapped += turn
  return wrapped
}

function EventMetrics({ event, archive }: { event: CommunityEvent; archive: W3LabsArchiveCopy }) {
  return (
    <header className="event-story-copy" data-event-copy>
      <h3>{event.title}</h3>
      <div className="event-story-metrics">
        {event.lines.map((line) => <p data-event-metric key={line}>{line}</p>)}
      </div>
      {event.variant === 'eurasia' && <a className="event-story-arrow" href="/community#community-channels" aria-label={archive.joinAria}>→</a>}
    </header>
  )
}

function PhotoFrame({ event, photo, index, archive, onOpen }: { event: CommunityEvent; photo: string; index: number; archive: W3LabsArchiveCopy; onOpen: (photo: LightboxState) => void }) {
  const photoIndex = index + 1
  return (
    <button
      className="event-media event-media--photo"
      type="button"
      data-event-frame
      data-rotation="0"
      onClick={() => onOpen({ title: event.title, frame: photoIndex, total: event.photos.length, src: photo })}
      aria-label={formatW3LabsCopy(archive.expandPhoto, { title: event.title, index: photoIndex })}
    >
      <img src={photo} alt={formatW3LabsCopy(archive.photoAlt, { title: event.title, index: photoIndex })} loading="lazy" decoding="async" />
      <span className="event-media-index">{String(photoIndex).padStart(2, '0')}</span>
      <Maximize2 className="event-media-icon" aria-hidden="true" size={17} strokeWidth={1.5} />
    </button>
  )
}

function EventGallery({ event, archive, onOpen }: { event: CommunityEvent; archive: W3LabsArchiveCopy; onOpen: (photo: LightboxState) => void }) {
  if (event.variant === 'reel') {
    return (
      <div className="event-gallery event-gallery--reel" data-event-gallery aria-label={formatW3LabsCopy(archive.reelAria, { title: event.title })}>
        <div className="event-reel-track" data-event-track>
          {event.photos.map((photo, index) => <PhotoFrame event={event} photo={photo} index={index} archive={archive} onOpen={onOpen} key={photo} />)}
        </div>
      </div>
    )
  }

  return (
    <div className={`event-gallery event-gallery--${event.variant}`} data-event-gallery aria-label={formatW3LabsCopy(archive.galleryAria, { title: event.title })}>
      {event.photos.map((photo, index) => <PhotoFrame event={event} photo={photo} index={index} archive={archive} onOpen={onOpen} key={photo} />)}
    </div>
  )
}

function EventStory({ event, index, archive, onOpen }: { event: CommunityEvent; index: number; archive: W3LabsArchiveCopy; onOpen: (photo: LightboxState) => void }) {
  return (
    <article className={`event-story event-story--${event.variant} event-story--tone-${(index % 3) + 1}`} id={event.id} data-event-story data-layout={event.variant}>
      <div className="event-story-stage" data-event-stage>
        <EventMetrics event={event} archive={archive} />
        {event.variant === 'szhk' && <img className="event-story-mark" src="/figma-assets/szhk-mark.svg" alt="" aria-hidden="true" />}
        <EventGallery event={event} archive={archive} onOpen={onOpen} />
      </div>
    </article>
  )
}

function CommunityWall({ archive, onOpen }: { archive: W3LabsArchiveCopy; onOpen: (photo: LightboxState) => void }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const stackRefs = useRef<Array<HTMLDivElement | null>>([])
  const phaseRef = useRef(wallAngleStep * 2)
  const angularVelocityRef = useRef(0)
  const pitchRef = useRef(Array.from({ length: wallStackCount }, () => 0))
  const pointerPitchRef = useRef(0)
  const draggingRef = useRef({ active: false, pointerId: -1, lastX: 0, lastTime: 0, travel: 0 })
  const suppressClickRef = useRef(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    let active = false
    let radius = 760
    let lastTime = 0

    const measure = () => {
      const firstStack = stackRefs.current[0]
      if (!firstStack) return
      const width = firstStack.getBoundingClientRect().width
      const gap = clamp(window.innerWidth * .005, 5, 8)
      const density = window.innerWidth >= 1680 ? 1.48 : window.innerWidth >= 1100 ? 1.6 : 1.7
      radius = density * (width + gap) / Math.sin(wallAngleStep * 2)
    }

    const setWillChange = (enabled: boolean) => {
      stackRefs.current.forEach((stack) => {
        if (stack) stack.style.willChange = enabled ? 'transform, opacity' : 'auto'
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      lastTime = 0
      setWillChange(active)
    }, { rootMargin: '18% 0px' })

    const resizeObserver = new ResizeObserver(measure)
    observer.observe(stage)
    resizeObserver.observe(stage)
    measure()

    const onPointerMove = (event: PointerEvent) => {
      pointerPitchRef.current = -(event.clientY / window.innerHeight - .5) * 16

      const drag = draggingRef.current
      if (!drag.active || drag.pointerId !== event.pointerId) return
      const now = performance.now()
      const delta = event.clientX - drag.lastX
      const elapsed = Math.max(16, now - drag.lastTime)
      drag.lastX = event.clientX
      drag.lastTime = now
      drag.travel += Math.abs(delta)
      if (drag.travel > 6) {
        suppressClickRef.current = true
        if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId)
      }
      phaseRef.current = wrapAngle(phaseRef.current - delta / radius)
      angularVelocityRef.current = clamp(-(delta / elapsed) * 1000 / radius, -.9, .9)
    }

    const endDrag = (event: PointerEvent) => {
      const drag = draggingRef.current
      if (!drag.active || drag.pointerId !== event.pointerId) return
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId)
      drag.active = false
      drag.pointerId = -1
      stage.classList.remove('event-wall-stage--dragging')
    }

    const onPointerDown = (event: PointerEvent) => {
      draggingRef.current = {
        active: true,
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastTime: performance.now(),
        travel: 0,
      }
      suppressClickRef.current = false
      angularVelocityRef.current = 0
      stage.classList.add('event-wall-stage--dragging')
    }

    const onPointerLeave = (event: PointerEvent) => {
      pointerPitchRef.current = 0
      if (draggingRef.current.active && !stage.hasPointerCapture(event.pointerId)) endDrag(event)
    }

    const onWheel = (event: WheelEvent) => {
      if (!active) return
      const delta = event.deltaY + event.deltaX
      angularVelocityRef.current = clamp(angularVelocityRef.current + delta * .00082, -.92, .92)
    }

    const render = (_time: number, deltaTime: number) => {
      if (!active || document.hidden) {
        lastTime = 0
        return
      }

      const now = performance.now()
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 1 / 30) : Math.min(deltaTime / 1000, 1 / 30)
      lastTime = now
      const drag = draggingRef.current

      if (!drag.active) {
        phaseRef.current = wrapAngle(phaseRef.current + (.072 + angularVelocityRef.current) * dt)
        angularVelocityRef.current *= Math.exp(-4.35 * dt)
        if (Math.abs(angularVelocityRef.current) < .0012) angularVelocityRef.current = 0
      }

      const pitches = pitchRef.current
      const targetPitch = pointerPitchRef.current
      pitches[0] += (targetPitch - pitches[0]) * (1 - Math.exp(-8.4 * dt))
      for (let index = 1; index < wallStackCount; index += 1) {
        const tightness = Math.max(2.3, 8.4 - index * .34)
        pitches[index] += (pitches[index - 1] - pitches[index]) * (1 - Math.exp(-tightness * dt))
      }

      stackRefs.current.forEach((stack, index) => {
        if (!stack) return
        const angle = shortestAngle(index * wallAngleStep - phaseRef.current)
        const x = radius * Math.sin(angle)
        const z = radius * (1 - Math.cos(angle))
        const yaw = -(angle * 180 / Math.PI)
        const fade = 1 - clamp((Math.abs(angle) - wallAngleStep * 1.96) / (wallAngleStep * .86), 0, 1)
        stack.style.transform = `translate3d(${x.toFixed(2)}px, -50%, ${z.toFixed(2)}px) rotateY(${yaw.toFixed(2)}deg) rotateX(${pitches[index].toFixed(2)}deg)`
        stack.style.opacity = fade.toFixed(3)
        stack.style.pointerEvents = fade > .04 ? 'auto' : 'none'
        stack.style.zIndex = `${Math.round(z)}`
      })
    }

    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', endDrag)
    stage.addEventListener('pointercancel', endDrag)
    stage.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('wheel', onWheel, { passive: true })
    gsap.ticker.add(render)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerup', endDrag)
      stage.removeEventListener('pointercancel', endDrag)
      stage.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('wheel', onWheel)
      gsap.ticker.remove(render)
      setWillChange(false)
    }
  }, [])

  const openWallPhoto = (photo: string, frame: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    onOpen({ title: archive.wallTitle, frame, total: wallPhotos.length, src: photo })
  }

  return (
    <section className="event-wall" id="community-wall" aria-label={archive.wallAria} data-event-wall>
      <div className="event-wall-stage" data-wall-stage ref={stageRef}>
        <div className="event-wall-orbit-viewport">
          <div className="event-wall-orbit">
            <div className="event-wall-ring">
              {Array.from({ length: wallStackCount }, (_, stackIndex) => (
                <div
                  className="event-wall-stack"
                  data-wall-stack
                  ref={(element) => { stackRefs.current[stackIndex] = element }}
                  key={stackIndex}
                >
                  {Array.from({ length: wallRows }, (_, rowIndex) => {
                    const photoIndex = (stackIndex * wallRows + rowIndex) % wallPhotos.length
                    const photo = wallPhotos[photoIndex]
                    const frame = photoIndex + 1
                    return (
                      <button
                        type="button"
                        className="event-wall-photo"
                        onPointerMove={(event) => {
                          const rect = event.currentTarget.getBoundingClientRect()
                          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
                          const y = ((event.clientY - rect.top) / rect.height) * 2 - 1
                          event.currentTarget.style.setProperty('--wall-rx', `${(-y * 4.5).toFixed(2)}deg`)
                          event.currentTarget.style.setProperty('--wall-ry', `${(x * 8).toFixed(2)}deg`)
                        }}
                        onPointerLeave={(event) => {
                          event.currentTarget.style.setProperty('--wall-rx', '0deg')
                          event.currentTarget.style.setProperty('--wall-ry', '0deg')
                        }}
                        onClick={() => openWallPhoto(photo, frame)}
                        aria-label={formatW3LabsCopy(archive.expandWallPhoto, { index: frame })}
                        key={`${stackIndex}-${rowIndex}`}
                      >
                        <img src={photo} alt={formatW3LabsCopy(archive.wallPhotoAlt, { index: frame })} loading="lazy" decoding="async" draggable="false" />
                        <span>{String(frame).padStart(2, '0')}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoLightbox({ active, archive, onClose }: { active: LightboxState; archive: W3LabsArchiveCopy; onClose: () => void }) {
  const [closing, setClosing] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const requestClose = useCallback(() => {
    if (closeTimerRef.current !== null) return
    setClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null
      onClose()
    }, 280)
  }, [onClose])

  useEffect(() => {
    if (active) setClosing(false)
  }, [active])

  useEffect(() => {
    if (!active) return
    const previousOverflow = document.body.style.overflow
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [active, requestClose])

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
  }, [])

  if (!active) return null

  return (
    <div ref={dialogRef} className={`event-lightbox ${closing ? 'event-lightbox--closing' : ''}`} role="dialog" aria-modal="true" aria-label={formatW3LabsCopy(archive.lightboxAria, { title: active.title, index: active.frame })} onMouseDown={(event) => { if (event.target === event.currentTarget) requestClose() }}>
      <button ref={closeButtonRef} className="event-lightbox-close" type="button" onClick={requestClose} aria-label={archive.closePreview}><X size={20} strokeWidth={1.6} /></button>
      <div className="event-lightbox-frame">
        <img src={active.src} alt={formatW3LabsCopy(archive.photoAlt, { title: active.title, index: active.frame })} />
        <div className="event-lightbox-caption"><span>{active.title}</span><strong>{String(active.frame).padStart(2, '0')} / {String(active.total).padStart(2, '0')}</strong></div>
      </div>
    </div>
  )
}

export default function W3LabsEventArchive() {
  const archiveRef = useRef<HTMLElement>(null)
  const { locale, messages } = useI18n()
  const archive = messages.w3labs.archive
  const communityEvents = buildCommunityEvents(messages.w3labs.eventCards)
  const [activePhoto, setActivePhoto] = useState<LightboxState>(null)
  const closeLightbox = useCallback(() => setActivePhoto(null), [])

  useGSAP(() => {
    const archive = archiveRef.current
    if (!archive) return

    const stories = gsap.utils.toArray<HTMLElement>('[data-event-story]', archive)
    const images = gsap.utils.toArray<HTMLImageElement>('img', archive)
    const media = gsap.matchMedia()
    const refresh = () => ScrollTrigger.refresh()

    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', refresh, { once: true })
    })

    media.add({ desktop: '(min-width: 901px)', reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
      const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean }

      if (reduce || !desktop) {
        gsap.set(gsap.utils.toArray<HTMLElement>('[data-event-frame], [data-event-copy], [data-event-gallery]', archive), { clearProps: 'all' })
        return
      }

      stories.forEach((story) => {
        const stage = story.querySelector<HTMLElement>('[data-event-stage]')
        const gallery = story.querySelector<HTMLElement>('[data-event-gallery]')
        const frames = gsap.utils.toArray<HTMLElement>('[data-event-frame]', story)
        const layout = story.dataset.layout as GalleryVariant
        if (!stage || !gallery) return

        const commonTrigger = {
          trigger: story,
          start: 'top top',
          end: 'bottom bottom',
          scrub: .62,
          invalidateOnRefresh: true,
          onToggle: ({ isActive }: { isActive: boolean }) => gsap.set(frames, { willChange: isActive ? 'transform, opacity' : 'auto' }),
        }

        if (layout === 'szhk') {
          const timeline = gsap.timeline({ scrollTrigger: commonTrigger })
          timeline.fromTo(frames, {
            autoAlpha: 0,
            x: (_, element) => gallery.clientWidth / 2 - ((element as HTMLElement).offsetLeft + (element as HTMLElement).offsetWidth / 2),
            y: (_, element) => gallery.clientHeight * .56 - ((element as HTMLElement).offsetTop + (element as HTMLElement).offsetHeight / 2),
            scale: .46,
            rotation: 0,
          }, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: (_, element) => Number((element as HTMLElement).dataset.rotation ?? 0),
            duration: .72,
            stagger: { amount: .22, from: 'center' },
            ease: 'power4.out',
          }, 0)
          return
        }

        if (layout === 'reel') {
          const track = story.querySelector<HTMLElement>('[data-event-track]')
          if (!track) return
          gsap.fromTo(track, { y: () => stage.clientHeight * .07 }, {
            y: () => -Math.max(0, track.scrollHeight - stage.clientHeight * .92),
            ease: 'none',
            scrollTrigger: {
              ...commonTrigger,
              onToggle: ({ isActive }: { isActive: boolean }) => gsap.set(track, { willChange: isActive ? 'transform' : 'auto' }),
            },
          })
          return
        }

        const timeline = gsap.timeline({ scrollTrigger: commonTrigger })
        timeline.fromTo(frames, {
          autoAlpha: 0,
          x: (_, element) => stage.clientWidth / 2 - ((element as HTMLElement).offsetLeft + (element as HTMLElement).offsetWidth / 2),
          y: (_, element) => stage.clientHeight / 2 - ((element as HTMLElement).offsetTop + (element as HTMLElement).offsetHeight / 2),
          scale: .42,
          rotation: 0,
        }, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: (_, element) => Number((element as HTMLElement).dataset.rotation ?? 0),
          duration: .7,
          stagger: { amount: .18, from: 'center' },
          ease: 'power4.out',
        })
      })

      ScrollTrigger.refresh()
    })

    return () => {
      images.forEach((image) => image.removeEventListener('load', refresh))
      media.revert()
    }
  }, { scope: archiveRef, dependencies: [locale] })

  return (
    <section className="event-archive" id="community-in-action" aria-label={archive.eventsAria} ref={archiveRef}>
      <div className="event-story-stack">
        {communityEvents.map((event, index) => <EventStory event={event} index={index} archive={archive} key={event.id} onOpen={setActivePhoto} />)}
      </div>
      <CommunityWall archive={archive} onOpen={setActivePhoto} />
      <PhotoLightbox active={activePhoto} archive={archive} onClose={closeLightbox} />
    </section>
  )
}
