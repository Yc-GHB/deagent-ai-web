'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// 保持原有轮播所用数据（折叠态下展示）
const partners = [
  { logo: '/images/partners/03.png' },
  { logo: '/images/partners/04.png' },
  { logo: '/images/partners/01.png' },
  { logo: '/images/partners/06.png' },
  { logo: '/images/partners/02.png' },
  { logo: '/images/partners/3.4.png' },
  { logo: '/images/partners/2.0.png' },
  { logo: '/images/partners/2.1.png' },
  { logo: '/images/partners/3.1.png' },
  { logo: '/images/partners/3.2.png' },
  { logo: '/images/partners/2.2.png' },
  { logo: '/images/partners/2.6.png' },
  { logo: '/images/partners/2.4.png' },
  { logo: '/images/partners/3.5.png' },
  { logo: '/images/partners/15.png' },
  { logo: '/images/partners/2.3.png' },
  { logo: '/images/partners/3.3.png' },
  { logo: '/images/partners/2.7.png' },
  { logo: '/images/partners/2.8.png' },
  { logo: '/images/partners/2.9.png' },
  { logo: '/images/partners/2.10.png' },
  { logo: '/images/partners/2.11.png' },
  // { logo: '/images/partners/2.12.png' },
  { logo: '/images/partners/2.13.png' },
  { logo: '/images/partners/2.14.png' },
  { logo: '/images/partners/2.15.png' },
  { logo: '/images/partners/2.16.png' },
  { logo: '/images/partners/07.png' },
  { logo: '/images/partners/2.17.png' },
  { logo: '/images/partners/14.png' },
  { logo: '/images/partners/017_Kernel.png' },
  { logo: '/images/partners/10.png' },
  { logo: '/images/partners/09.png' },
  { logo: '/images/partners/11.png' },
  { logo: '/images/partners/12.png' },
  { logo: '/images/partners/13.png' },

]

// 展开态：分为 Partnership 与 Funding 两组
const partnershipLogos = [
  { logo: '/images/partners/03.png' },
  { logo: '/images/partners/04.png' },
  { logo: '/images/partners/01.png' },
  { logo: '/images/partners/06.png' },
  { logo: '/images/partners/02.png' },
  { logo: '/images/partners/3.4.png' },
  { logo: '/images/partners/2.0.png' },
  { logo: '/images/partners/2.1.png' },
  { logo: '/images/partners/3.1.png' },
  { logo: '/images/partners/3.2.png' },
  { logo: '/images/partners/2.2.png' },
  { logo: '/images/partners/2.6.png' },
  { logo: '/images/partners/2.4.png' },
  { logo: '/images/partners/3.5.png' },
  { logo: '/images/partners/15.png' },
  { logo: '/images/partners/2.3.png' },
  { logo: '/images/partners/3.3.png' },
  { logo: '/images/partners/2.7.png' },
  { logo: '/images/partners/2.8.png' },
  { logo: '/images/partners/2.9.png' },
  { logo: '/images/partners/2.10.png' },
  { logo: '/images/partners/2.11.png' },
  // { logo: '/images/partners/2.12.png' },
  { logo: '/images/partners/2.13.png' },

]

const fundingLogos = [
  { logo: '/images/partners/2.14.png' },
  { logo: '/images/partners/2.15.png' },
  { logo: '/images/partners/2.16.png' },
  { logo: '/images/partners/07.png' },
  { logo: '/images/partners/2.17.png' },
  { logo: '/images/partners/14.png' },
  { logo: '/images/partners/017_Kernel.png' },
  { logo: '/images/partners/10.png' },
  { logo: '/images/partners/09.png' },
  { logo: '/images/partners/11.png' },
  { logo: '/images/partners/12.png' },
  { logo: '/images/partners/13.png' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function Partner({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const trackRef = useRef<HTMLDivElement | null>(null)
  const groupRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const xRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const groupWidthRef = useRef<number>(0)
  const rafActiveRef = useRef<boolean>(false)
  const [dupCount, setDupCount] = useState<number>(2)

  const handleImageError = (partnerName: string, fallback?: string) => {
    if (fallback) {
      setImageErrors(prev => ({ ...prev, [partnerName]: true }))
    }
  }

  // 折叠态：无缝轮播（双组+位置重置，避免 DOM 变更导致跳动）
  useEffect(() => {
    if (isExpanded) {
      if (trackRef.current) { trackRef.current.style.transform = 'translateX(0px)' }
      xRef.current = 0
      if (rafRef.current) { cancelAnimationFrame(rafRef.current) }
      return
    }

    let last = performance.now()
    const speedPxPerSec = 40

    const step = (now: number) => {
      if (!rafActiveRef.current) { return }
      const dt = (now - last) / 1000
      last = now

      const track = trackRef.current
      if (!track) {
        rafRef.current = requestAnimationFrame(step)
        return
      }

      xRef.current -= speedPxPerSec * dt

      // 以第一次测得的单组宽度为准，保证恒定重置距离
      const measured = groupWidthRef.current || (groupRef.current ? groupRef.current.offsetWidth : 0)
      if (!groupWidthRef.current && measured > 0) {
        groupWidthRef.current = measured
      }
      const singleWidth = groupWidthRef.current || track.scrollWidth / 2
      while (singleWidth > 0 && -xRef.current >= singleWidth) {
        xRef.current += singleWidth
      }

      track.style.transform = `translateX(${xRef.current}px)`
      rafRef.current = requestAnimationFrame(step)
    }

    rafActiveRef.current = true
    rafRef.current = requestAnimationFrame(step)
    return () => {
      rafActiveRef.current = false
      if (rafRef.current) { cancelAnimationFrame(rafRef.current) }
    }
  }, [isExpanded])

  // 根据容器与单组宽度，计算需要的重复组数量，保证始终覆盖屏幕且多出一组缓冲
  useEffect(() => {
    if (!containerRef.current || !groupRef.current) { return }

    const recompute = () => {
      const containerW = containerRef.current ? containerRef.current.offsetWidth : 0
      const groupW = groupRef.current ? groupRef.current.offsetWidth : 0
      if (groupW <= 0 || containerW <= 0) { return }
      groupWidthRef.current = groupW
      const needed = Math.max(2, Math.ceil(containerW / groupW) + 2)
      setDupCount(needed)
    }

    const ro1 = new ResizeObserver(recompute)
    const ro2 = new ResizeObserver(recompute)
    ro1.observe(containerRef.current)
    ro2.observe(groupRef.current)
    recompute()
    return () => {
      ro1.disconnect()
      ro2.disconnect()
    }
  }, [])

  return (
    <section className={`w-full py-10 md:py-16 ${className}`}>
      <div className='max-w-[1024px] mx-auto px-4 md:px-6'>
        {/* 标题部分 */}
        <div className='flex items-center justify-start mb-8'>
          <p className='text-[#78E7FB] text-[12px]'>
            Partnership & Funding
          </p>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#2A2A3E] transition-colors ml-4'
          >
            <motion.span
              animate={{
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
              className='text-[#78E7FB] text-xl'
            >
              ▼
            </motion.span>
          </motion.button>
        </div>

        {/* 合作伙伴展示部分 */}
        <div className='w-full overflow-hidden'>
          {isExpanded ? (
            <motion.div
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              className='w-full'
            >
              {/* Partnership */}
              <div className='mb-6'>
                <p className='text-white text-sm md:text-base mb-4 opacity-80 text-center'>Partnership</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 place-items-center'>
                  {partnershipLogos
                    .filter(p => !imageErrors[p.logo])
                    .map((partner, index) => (
                      <motion.div
                        key={`${partner.logo}-${index}`}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.1,
                          filter: 'brightness(1.5)',
                          transition: { duration: 0.2 },
                        }}
                        className='opacity-80 hover:opacity-100 transition-all w-full flex items-center justify-center h-16'
                      >
                        <Image
                          src={partner.logo}
                          alt={partner.logo}
                          width={180}
                          height={60}
                          priority
                          onError={() => handleImageError(partner.logo, partner.logo)}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Funding */}
              <div>
                <p className='text-white text-sm md:text-base mb-4 opacity-80 text-center'>Funding</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 place-items-center'>
                  {fundingLogos
                    .filter(p => !imageErrors[p.logo])
                    .map((partner, index) => (
                      <motion.div
                        key={`${partner.logo}-${index}`}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.1,
                          filter: 'brightness(1.5)',
                          transition: { duration: 0.2 },
                        }}
                        className='opacity-80 hover:opacity-100 transition-all w-full flex items-center justify-center h-16'
                      >
                        <Image
                          src={partner.logo}
                          alt={partner.logo}
                          width={180}
                          height={60}
                          priority
                          onError={() => handleImageError(partner.logo, partner.logo)}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div ref={containerRef} className='overflow-hidden py-4'>
              <div ref={trackRef} className='flex items-center will-change-transform [transform:translateZ(0)]'>
                <div ref={groupRef} className='flex-none flex items-center gap-16 pr-16 [backface-visibility:hidden] [transform:translateZ(0)]'>
                  {partners.map((partner, index) => (
                    <motion.div
                      key={`${partner.logo}-${index}`}
                      whileHover={{
                        scale: 1.1,
                        filter: 'brightness(1.5)',
                        transition: { duration: 0.2 },
                      }}
                      className='opacity-80 hover:opacity-100 transition-all flex-shrink-0'
                    >
                      <Image
                        src={imageErrors[partner.logo] && partner.logo ? partner.logo : partner.logo}
                        alt={partner.logo}
                        width={180}
                        height={60}
                        priority
                        onError={() => handleImageError(partner.logo, partner.logo)}
                      />
                    </motion.div>
                  ))}
                </div>
                {/* 重复多组用于无缝过渡，数量动态计算 */}
                {Array.from({ length: dupCount }).map((_, gi) => (
                  <div aria-hidden key={`dup-${gi}`} className='flex-none flex items-center gap-16 pr-16 [backface-visibility:hidden] [transform:translateZ(0)]'>
                    {partners.map((partner, index) => (
                      <div key={`${partner.logo}-dup-${gi}-${index}`} className='opacity-80 flex-shrink-0'>
                        <Image
                          src={imageErrors[partner.logo] && partner.logo ? partner.logo : partner.logo}
                          alt={partner.logo}
                          width={180}
                          height={60}
                          priority
                          onError={() => handleImageError(partner.logo, partner.logo)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
