'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const logos = [
  { src: '/binance.svg', alt: 'Binance', width: 120, height: 48 },
  { src: '/ton.svg', alt: 'TON', width: 120, height: 48 },
  { src: '/iotex.svg', alt: 'IoTeX', width: 120, height: 48 },
  { src: '/kucoin.svg', alt: 'KuCoin', width: 120, height: 48 },
  { src: '/okx.svg', alt: 'OKX', width: 120, height: 48 },
  { src: '/solana.svg', alt: 'Solana', width: 120, height: 48 },
  // Duplicate logos for seamless scrolling
  { src: '/binance.svg', alt: 'Binance', width: 120, height: 48 },
  { src: '/ton.svg', alt: 'TON', width: 120, height: 48 },
  { src: '/iotex.svg', alt: 'IoTeX', width: 120, height: 48 },
  { src: '/kucoin.svg', alt: 'KuCoin', width: 120, height: 48 },
  { src: '/okx.svg', alt: 'OKX', width: 120, height: 48 },
  { src: '/solana.svg', alt: 'Solana', width: 120, height: 48 },
]

export function LogoScroll() {
  return (
    <div className='relative overflow-hidden w-full py-8'>
      <motion.div
        className='flex gap-12'
        animate={{
          x: [0, -50 * logos.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-[120px] flex items-center justify-center'
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className='h-8 opacity-70 hover:opacity-100 transition-opacity'
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
