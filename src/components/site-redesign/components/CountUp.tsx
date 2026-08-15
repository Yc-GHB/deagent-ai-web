// @ts-nocheck
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

gsap.registerPlugin(useGSAP)

type CountUpProps = {
  value: number
  duration?: number
  delay?: number
}

export default function CountUp({ value, duration = 2.4, delay = 0.3 }: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const number = numberRef.current
    if (!number) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      number.textContent = String(value)
      return
    }

    const state = { current: 0 }
    let animation: gsap.core.Tween | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animation) return

      animation = gsap.to(state, {
        current: value,
        duration,
        delay,
        ease: 'power2.out',
        snap: { current: 1 },
        onUpdate: () => {
          number.textContent = String(Math.round(state.current))
        },
        onComplete: () => {
          number.textContent = String(value)
          observer.disconnect()
        },
      })
    }, { threshold: 0.4 })

    observer.observe(number)

    return () => {
      observer.disconnect()
      animation?.kill()
    }
  }, { scope: numberRef, dependencies: [value, duration, delay], revertOnUpdate: true })

  return <span ref={numberRef} className="count-up-number">0</span>
}
