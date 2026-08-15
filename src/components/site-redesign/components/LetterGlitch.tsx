// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import './LetterGlitch.css'

type LetterGlitchProps = {
  glitchColors?: string[]
  className?: string
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
}

type GlitchLetter = {
  char: string
  color: string
  startColor: string
  targetColor: string
  colorProgress: number
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'

function parseColor(color: string) {
  const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (rgb) return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) }

  const normalized = color.replace('#', '')
  const hex = normalized.length === 3
    ? normalized.split('').map((character) => character + character).join('')
    : normalized
  if (!/^[a-f\d]{6}$/i.test(hex)) return { r: 255, g: 255, b: 255 }

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

function interpolateColor(start: string, end: string, progress: number) {
  const from = parseColor(start)
  const to = parseColor(end)
  return `rgb(${Math.round(from.r + (to.r - from.r) * progress)}, ${Math.round(from.g + (to.g - from.g) * progress)}, ${Math.round(from.b + (to.b - from.b) * progress)})`
}

export default function LetterGlitch({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = DEFAULT_CHARACTERS,
}: LetterGlitchProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!root || !canvas || !context) return

    const lettersAndSymbols = Array.from(characters)
    const fontSize = 16
    const charWidth = 10
    const charHeight = 20
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let letters: GlitchLetter[] = []
    let columns = 0
    let animationFrame = 0
    let resizeTimer = 0
    let lastGlitchTime = performance.now()

    const randomCharacter = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)] ?? 'A'
    const randomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? '#151616'

    const drawLetters = () => {
      const { width, height } = canvas.getBoundingClientRect()
      context.clearRect(0, 0, width, height)
      context.font = `${fontSize}px "Geist Mono", monospace`
      context.textBaseline = 'top'

      letters.forEach((letter, index) => {
        context.fillStyle = letter.color
        context.fillText(letter.char, (index % columns) * charWidth, Math.floor(index / columns) * charHeight)
      })
    }

    const initialize = () => {
      const bounds = root.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(bounds.width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(bounds.height * pixelRatio))
      canvas.style.width = `${bounds.width}px`
      canvas.style.height = `${bounds.height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      columns = Math.max(1, Math.ceil(bounds.width / charWidth))
      const rows = Math.max(1, Math.ceil(bounds.height / charHeight))
      letters = Array.from({ length: columns * rows }, () => {
        const color = randomColor()
        return { char: randomCharacter(), color, startColor: color, targetColor: color, colorProgress: 1 }
      })
      drawLetters()
    }

    const updateLetters = () => {
      const updateCount = Math.max(1, Math.floor(letters.length * 0.05))
      for (let index = 0; index < updateCount; index += 1) {
        const letter = letters[Math.floor(Math.random() * letters.length)]
        if (!letter) continue
        letter.char = randomCharacter()
        letter.startColor = letter.color
        letter.targetColor = randomColor()
        letter.colorProgress = smooth ? 0 : 1
        if (!smooth) letter.color = letter.targetColor
      }
    }

    const animate = (now: number) => {
      if (now - lastGlitchTime >= glitchSpeed) {
        updateLetters()
        lastGlitchTime = now
      }

      let transitioning = false
      if (smooth) {
        letters.forEach((letter) => {
          if (letter.colorProgress >= 1) return
          letter.colorProgress = Math.min(1, letter.colorProgress + 0.05)
          letter.color = interpolateColor(letter.startColor, letter.targetColor, letter.colorProgress)
          transitioning = true
        })
      }

      if (transitioning || now - lastGlitchTime < 18) drawLetters()
      animationFrame = window.requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(initialize, 100)
    })

    initialize()
    resizeObserver.observe(root)
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(resizeTimer)
      resizeObserver.disconnect()
    }
  }, [characters, glitchColors, glitchSpeed, smooth])

  return (
    <div ref={rootRef} className={`letter-glitch ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="letter-glitch__canvas" />
      {outerVignette && <span className="letter-glitch__outer-vignette" />}
      {centerVignette && <span className="letter-glitch__center-vignette" />}
    </div>
  )
}
