// @ts-nocheck
'use client'

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  type HTMLAttributes,
  type RefAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './CardSwap.css'

type CardProps = HTMLAttributes<HTMLDivElement> & { customClass?: string }

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, className, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card-swap-card ${customClass ?? ''} ${className ?? ''}`.trim()} />
))
Card.displayName = 'Card'

type CardSwapProps = {
  width?: number
  height?: number
  cardDistance?: number
  verticalDistance?: number
  skewAmount?: number
  easing?: 'linear' | 'elastic'
  activeIndex?: number
  onSwap?: () => void
  children: ReactNode
}

const slot = (index: number, distanceX: number, distanceY: number, total: number) => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index,
})

const CardSwap = ({
  width = 300,
  height = 400,
  cardDistance = 76,
  verticalDistance = 50,
  skewAmount = 4,
  easing = 'elastic',
  activeIndex = 0,
  onSwap,
  children,
}: CardSwapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const order = useRef<number[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const previousActiveIndexRef = useRef(activeIndex)
  const cards = useMemo(() => Children.toArray(children).filter(isValidElement) as ReactElement<CardProps & RefAttributes<HTMLDivElement>>[], [children])

  const place = useCallback((card: HTMLDivElement | null, target: ReturnType<typeof slot>) => {
    if (!card) return
    gsap.set(card, {
      x: target.x,
      y: target.y,
      z: target.z,
      zIndex: target.zIndex,
      xPercent: -50,
      yPercent: -50,
      skewY: skewAmount,
      transformOrigin: 'center center',
      force3D: true,
    })
  }, [skewAmount])

  const reset = useCallback(() => {
    timelineRef.current?.kill()
    order.current = cards.map((_, index) => index)
    order.current.forEach((cardIndex, index) => place(cardRefs.current[cardIndex], slot(index, cardDistance, verticalDistance, cards.length)))
  }, [cardDistance, cards.length, place, verticalDistance])

  const swap = useCallback(() => {
    if (order.current.length < 2 || timelineRef.current?.isActive()) return
    const [front, ...rest] = order.current
    const departing = cardRefs.current[front]
    if (!departing) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      order.current = [...rest, front]
      order.current.forEach((cardIndex, index) => place(cardRefs.current[cardIndex], slot(index, cardDistance, verticalDistance, cards.length)))
      return
    }

    const ease = easing === 'elastic' ? 'elastic.out(0.6,0.9)' : 'power1.inOut'
    const tl = gsap.timeline({ defaults: { ease } })
    timelineRef.current = tl
    tl.to(departing, { y: '+=500', duration: easing === 'elastic' ? 1.15 : 0.65 })
      .addLabel('promote', '-=0.72')

    rest.forEach((cardIndex, index) => {
      const target = slot(index, cardDistance, verticalDistance, cards.length)
      const card = cardRefs.current[cardIndex]
      if (!card) return
      tl.set(card, { zIndex: target.zIndex }, 'promote')
      tl.to(card, { x: target.x, y: target.y, z: target.z, duration: easing === 'elastic' ? 1.05 : 0.65 }, `promote+=${index * 0.12}`)
    })

    const back = slot(cards.length - 1, cardDistance, verticalDistance, cards.length)
    tl.addLabel('return', 'promote+=0.28')
      .set(departing, { zIndex: back.zIndex }, 'return')
      .to(departing, { x: back.x, y: back.y, z: back.z, duration: easing === 'elastic' ? 1.05 : 0.65 }, 'return')
      .call(() => { order.current = [...rest, front] })
  }, [cardDistance, cards.length, easing, place, verticalDistance])

  useGSAP(() => {
    reset()
    previousActiveIndexRef.current = activeIndex
    return () => timelineRef.current?.kill()
  }, { scope: containerRef, dependencies: [cards.length, cardDistance, verticalDistance, skewAmount], revertOnUpdate: true })

  useGSAP(() => {
    if (previousActiveIndexRef.current === activeIndex) return
    previousActiveIndexRef.current = activeIndex
    swap()
  }, { scope: containerRef, dependencies: [activeIndex] })

  return (
    <div
      ref={containerRef}
      className={`card-swap-container ${onSwap ? 'card-swap-container--interactive' : ''}`}
      style={{ width, height }}
      role={onSwap ? 'button' : undefined}
      tabIndex={onSwap ? 0 : undefined}
      aria-label={onSwap ? 'Switch agent example' : undefined}
      onClick={onSwap}
      onKeyDown={(event) => {
        if (!onSwap || (event.key !== 'Enter' && event.key !== ' ')) return
        event.preventDefault()
        onSwap()
      }}
    >
      {cards.map((card, index) => cloneElement<CardProps & RefAttributes<HTMLDivElement>>(card, {
        key: index,
        ref: (node: HTMLDivElement | null) => { cardRefs.current[index] = node },
        style: { width, height, ...card.props.style },
      }))}
    </div>
  )
}

export default CardSwap
