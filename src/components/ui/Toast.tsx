'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ToastProps {
  message: string
  type?: 'error' | 'success'
  duration?: number
  onClose?: () => void
}

/**
 * 导航栏下方的全局提示，渲染到 document.body。
 */
export function Toast({ message, type = 'success', duration = 3200, onClose }: ToastProps) {
  const [isMounted, setIsMounted] = useState(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onCloseRef.current?.()
    }, duration)
    return () => window.clearTimeout(timer)
  }, [duration, message])

  if (!isMounted) return null

  return createPortal(
    <div className={type === 'error' ? 'site-toast site-toast--error' : 'site-toast'} role='status'>
      {message}
    </div>,
    document.body,
  )
}
