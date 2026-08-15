'use client'

import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config/web3'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

// Create query client with retry configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

interface Web3ErrorBoundaryProps {
  error: Error
  resetErrorBoundary: () => void
}

const Web3ErrorBoundary: FC<Web3ErrorBoundaryProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-white'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Web3 连接错误</h1>
        <p className='text-gray-400 mb-6'>{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className='px-6 py-3 bg-[#00D5DA] text-black rounded-lg hover:bg-[#00D5DA]/90 transition-colors'
        >
          重试连接
        </button>
      </div>
    </div>
  )
}

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    setMounted(true)

    // 添加全局错误处理
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Failed to fetch')) {
        setError(new Error('网络连接失败，请检查您的网络连接并重试'))
        setRetryCount(prev => prev + 1)
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // 自动重试逻辑
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [error, retryCount])

  if (error) {
    return (
      <Web3ErrorBoundary
        error={error}
        resetErrorBoundary={() => {
          setError(null)
          setRetryCount(0)
        }}
      />
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
