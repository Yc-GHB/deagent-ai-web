// @ts-nocheck
'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './ScrambledText.css'

type ScrambledTextProps = {
  radius?: number
  duration?: number
  speed?: number
  scrambleChars?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

gsap.registerPlugin(useGSAP)

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style,
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const tweensRef = useRef(new Map<HTMLSpanElement, gsap.core.Tween>())
  const content = typeof children === 'string' || typeof children === 'number' ? String(children) : ''
  const characters = Array.from(content)

  useGSAP((_, contextSafe) => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const charNodes = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-scramble-char]'))
    const makeContextSafe = contextSafe ?? ((callback: (event: PointerEvent) => void) => callback)
    const onMove = makeContextSafe((event: PointerEvent) => {
      charNodes.forEach((char, index) => {
        const original = char.dataset.original ?? ''
        if (!original.trim()) return

        const box = char.getBoundingClientRect()
        const distance = Math.hypot(event.clientX - (box.left + box.width / 2), event.clientY - (box.top + box.height / 2))
        if (distance >= radius) return

        const state = { progress: 0 }
        const charDuration = Math.max(0.12, duration * (1 - distance / radius))
        tweensRef.current.get(char)?.kill()
        const tween = gsap.to(state, {
          progress: 1,
          duration: charDuration,
          ease: 'none',
          overwrite: 'auto',
          onUpdate: () => {
            const cycle = Math.floor(state.progress * 24 * Math.max(speed, 0.1))
            char.textContent = state.progress > 0.86
              ? original
              : scrambleChars[(index + cycle) % scrambleChars.length] ?? original
          },
          onComplete: () => {
            char.textContent = original
            tweensRef.current.delete(char)
          },
        })
        tweensRef.current.set(char, tween)
      })
    })

    root.addEventListener('pointermove', onMove)
    return () => {
      root.removeEventListener('pointermove', onMove)
      tweensRef.current.forEach((tween) => tween.kill())
      tweensRef.current.clear()
    }
  }, { scope: rootRef, dependencies: [radius, duration, speed, scrambleChars, content], revertOnUpdate: true })

  return (
    <span ref={rootRef} className={`scrambled-text ${className}`.trim()} style={style} aria-label={content}>
      {characters.map((character, index) => (
        <span key={`${character}-${index}`} aria-hidden="true" className="scrambled-text__char" data-scramble-char data-original={character}>
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  )
}
