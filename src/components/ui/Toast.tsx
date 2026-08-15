'use client'

import { useEffect, useRef } from 'react'

interface ToastProps {
  message: string
  type?: 'error' | 'success'
  duration?: number
  onClose?: () => void
}

/**
 * 导航栏下方的全局提示，直接挂到 document.body。
 */
export function Toast({ message, type = 'success', duration = 3200, onClose }: ToastProps): null {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const node = document.createElement('div')
    node.className = type === 'error' ? 'site-toast site-toast--error' : 'site-toast'
    node.setAttribute('role', 'status')
    node.textContent = message
    document.body.appendChild(node)
    const timer = window.setTimeout(() => {
      node.remove()
      onCloseRef.current?.()
    }, duration)
    return () => {
      window.clearTimeout(timer)
      node.remove()
    }
  }, [duration, message, type])

  return null
}
