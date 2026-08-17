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

/**
 * 按 frontIndex 生成牌序：front 在最前，其余依次后排。
 */
function buildOrder(frontIndex: number, total: number): number[] {
  if (total <= 0) return []
  const normalized = ((frontIndex % total) + total) % total
  return Array.from({ length: total }, (_, index) => (normalized + index) % total)
}

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

  const placeOrder = useCallback((nextOrder: number[]) => {
    order.current = nextOrder
    nextOrder.forEach((cardIndex, index) => {
      place(cardRefs.current[cardIndex], slot(index, cardDistance, verticalDistance, nextOrder.length))
    })
  }, [cardDistance, place, verticalDistance])

  /**
   * 将最前卡片切到 targetFront；中断进行中的动画时直接落到正确牌序。
   */
  const syncToFront = useCallback((targetFront: number, animate: boolean) => {
    const total = cards.length
    if (total < 1) return
    const wasAnimating = Boolean(timelineRef.current?.isActive())
    timelineRef.current?.kill()
    timelineRef.current = null
    const nextOrder = buildOrder(targetFront, total)
    const currentFront = order.current[0]
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!animate || reducedMotion || wasAnimating || total < 2 || currentFront === undefined || currentFront === targetFront) {
      placeOrder(nextOrder)
      return
    }
    const departing = cardRefs.current[currentFront]
    if (!departing) {
      placeOrder(nextOrder)
      return
    }
    const promoteOrder = nextOrder.filter((cardIndex) => cardIndex !== currentFront)
    const ease = easing === 'elastic' ? 'elastic.out(0.6,0.9)' : 'power1.inOut'
    const tl = gsap.timeline({
      defaults: { ease },
      onComplete: () => {
        order.current = nextOrder
        timelineRef.current = null
      },
    })
    timelineRef.current = tl
    tl.to(departing, { y: '+=500', duration: easing === 'elastic' ? 1.15 : 0.65 })
      .addLabel('promote', '-=0.72')
    promoteOrder.forEach((cardIndex, index) => {
      const target = slot(index, cardDistance, verticalDistance, total)
      const card = cardRefs.current[cardIndex]
      if (!card) return
      tl.set(card, { zIndex: target.zIndex }, 'promote')
      tl.to(card, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: easing === 'elastic' ? 1.05 : 0.65,
      }, `promote+=${index * 0.12}`)
    })
    const back = slot(total - 1, cardDistance, verticalDistance, total)
    tl.addLabel('return', 'promote+=0.28')
      .set(departing, { zIndex: back.zIndex }, 'return')
      .to(departing, {
        x: back.x,
        y: back.y,
        z: back.z,
        duration: easing === 'elastic' ? 1.05 : 0.65,
      }, 'return')
  }, [cardDistance, cards.length, easing, placeOrder, verticalDistance])

  useGSAP(() => {
    timelineRef.current?.kill()
    placeOrder(buildOrder(activeIndex, cards.length))
    previousActiveIndexRef.current = activeIndex
    return () => timelineRef.current?.kill()
  }, { scope: containerRef, dependencies: [cards.length, cardDistance, verticalDistance, skewAmount], revertOnUpdate: true })

  useGSAP(() => {
    if (previousActiveIndexRef.current === activeIndex) return
    previousActiveIndexRef.current = activeIndex
    syncToFront(activeIndex, true)
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
