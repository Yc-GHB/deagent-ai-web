'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useI18n } from '@/i18n/I18nProvider'

gsap.registerPlugin(useGSAP)

const PURPOSE_PHOTO_SRCS = [
  '/events/szhk-web3/02.jpg',
  '/events/szhk-web3/05.jpg',
  '/events/szhk-web3/06.jpg',
  '/events/hichuang-raccoon-ai-shanghai/04.jpg',
  '/events/hichuang-raccoon-ai-shanghai/01.jpg',
  '/events/hichuang-raccoon-ai-shanghai/03.jpg',
] as const

/**
 * W3Labs 影像星座区：围绕线下活动定位的照片编排。
 */
export default function W3LabsPhotoConstellation() {
  const sectionRef = useRef<HTMLElement>(null)
  const { locale, messages } = useI18n()
  const purpose = messages.w3labs.purpose

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = gsap.utils.toArray<HTMLElement>('[data-purpose-photo]', section)
    const cardBodies = gsap.utils.toArray<HTMLElement>('[data-purpose-card]', section)
    const copy = section.querySelector<HTMLElement>('[data-purpose-copy]')
    const stage = section.querySelector<HTMLElement>('[data-purpose-stage]')
    const media = gsap.matchMedia()

    media.add({ desktop: '(min-width: 901px)', reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
      const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean }
      gsap.set([...cards, ...cardBodies, copy], { clearProps: 'all' })

      if (reduce || !desktop || !stage || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

      const scatter = [
        { x: -24, y: -12, rotation: -13 },
        { x: 0, y: -28, rotation: 0 },
        { x: 24, y: -12, rotation: 13 },
        { x: -24, y: 16, rotation: 13 },
        { x: 0, y: 30, rotation: 0 },
        { x: 24, y: 16, rotation: -13 },
      ]
      let stageActive = false

      const resetCard = (cardBody: HTMLElement, index: number) => {
        const target = stageActive ? scatter[index] : { x: 0, y: 0, rotation: 0 }
        gsap.to(cardBody, {
          ...target,
          scale: stageActive ? 1.03 : 1,
          rotateX: 0,
          rotateY: 0,
          filter: 'brightness(1)',
          duration: .72,
          ease: 'power4.out',
          overwrite: 'auto',
          onComplete: () => gsap.set(cardBody, { willChange: 'auto' }),
        })
      }

      const enterStage = () => {
        stageActive = true
        cardBodies.forEach((cardBody, index) => {
          gsap.set(cardBody, { willChange: 'transform, filter' })
          gsap.to(cardBody, {
            ...scatter[index],
            scale: 1.03,
            duration: .86,
            delay: index * .018,
            ease: 'back.out(1.12)',
            overwrite: 'auto',
          })
        })
      }

      const leaveStage = () => {
        stageActive = false
        cardBodies.forEach(resetCard)
      }

      const cardCleanups = cardBodies.map((cardBody, index) => {
        const outer = cards[index]
        const glow = cardBody.querySelector<HTMLElement>('[data-purpose-glow]')
        const rotateXTo = gsap.quickTo(cardBody, 'rotateX', { duration: .48, ease: 'power3.out' })
        const rotateYTo = gsap.quickTo(cardBody, 'rotateY', { duration: .48, ease: 'power3.out' })

        const enterCard = () => {
          outer.style.zIndex = '40'
          gsap.set(cardBody, { willChange: 'transform, filter' })
          gsap.to(cardBody, { scale: 1.12, filter: 'brightness(1.08)', duration: .48, ease: 'back.out(1.22)', overwrite: 'auto' })
        }
        const moveCard = (event: PointerEvent) => {
          const bounds = outer.getBoundingClientRect()
          const px = (event.clientX - bounds.left) / bounds.width
          const py = (event.clientY - bounds.top) / bounds.height
          rotateYTo((px - .5) * 20)
          rotateXTo((.5 - py) * 16)
          if (glow) {
            glow.style.setProperty('--pointer-x', `${px * 100}%`)
            glow.style.setProperty('--pointer-y', `${py * 100}%`)
          }
        }
        const leaveCard = () => {
          outer.style.zIndex = ''
          resetCard(cardBody, index)
        }

        outer.addEventListener('pointerenter', enterCard)
        outer.addEventListener('pointermove', moveCard)
        outer.addEventListener('pointerleave', leaveCard)
        return () => {
          outer.removeEventListener('pointerenter', enterCard)
          outer.removeEventListener('pointermove', moveCard)
          outer.removeEventListener('pointerleave', leaveCard)
        }
      })

      stage.addEventListener('pointerenter', enterStage)
      stage.addEventListener('pointerleave', leaveStage)
      return () => {
        stage.removeEventListener('pointerenter', enterStage)
        stage.removeEventListener('pointerleave', leaveStage)
        cardCleanups.forEach((cleanup) => cleanup())
      }
    })

    return () => media.revert()
  }, { scope: sectionRef, dependencies: [locale] })

  return (
    <section className="purpose-orbit" aria-labelledby="w3labs-purpose-title" ref={sectionRef}>
      <div className="purpose-orbit-stage" data-purpose-stage>
        {PURPOSE_PHOTO_SRCS.map((src, index) => (
          <figure className={`purpose-photo purpose-photo--${index + 1}`} data-purpose-photo key={src}>
            <div className="purpose-photo-card" data-purpose-card>
              <img src={src} alt={purpose.photoAlts[index] ?? ''} loading="lazy" decoding="async" />
              <span className="purpose-photo-glow" data-purpose-glow aria-hidden="true" />
            </div>
          </figure>
        ))}
        <div className="purpose-orbit-copy" data-purpose-copy>
          <h2 id="w3labs-purpose-title">{purpose.titleLine1}<br />{purpose.titleLine2}</h2>
          <p>{purpose.copy}</p>
        </div>
      </div>
    </section>
  )
}
