'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const shimmerEffect = {
  hidden: {
    backgroundPosition: '200% 0',
    opacity: 0,
  },
  visible: {
    backgroundPosition: '-200% 0',
    opacity: 1,
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

export function Hero() {
  const { scrollY } = useScroll()
  const [isMounted, setIsMounted] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const backgroundY = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    // 使用requestAnimationFrame确保在下一帧渲染前设置状态
    const frame = requestAnimationFrame(() => {
      setIsMounted(true)
    })

    // 检查视频是否已经加载
    const videoElement = videoRef.current
    if (videoElement) {
      // 如果视频已经有足够的数据可以播放
      if (videoElement.readyState >= 3) {
        setIsVideoLoaded(true)
      } else {
        // 监听视频可以播放事件
        const handleCanPlay = () => {
          setIsVideoLoaded(true)
        }
        videoElement.addEventListener('canplay', handleCanPlay)
        return () => {
          videoElement.removeEventListener('canplay', handleCanPlay)
          cancelAnimationFrame(frame)
        }
      }
    }

    return () => cancelAnimationFrame(frame)
  }, [])

  // 不再提前返回null，而是使用opacity控制可见性
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isMounted ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className='relative overflow-hidden w-full h-screen'
    >
      {/* 视频背景 */}
      <div className='absolute inset-0 w-full h-full z-0'>
        {/* 视频加载占位图 */}
        {!isVideoLoaded && (
          <img
            src='/videos/video-loading.png'
            alt='Loading'
            className='absolute inset-0 w-full h-full object-cover'
          />
        )}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          <source src='/videos/hero-background.mp4' type='video/mp4' />
          {/* 如果视频无法播放，回退到背景色 */}
          <div className='absolute inset-0 bg-[#0D0620]' />
        </video>
        {/* 添加一个覆盖层，使视频不会太抢眼 */}
        <div className='absolute inset-0 bg-[#0D0620]/60'></div>
        {/* 底部渐变色 */}
        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgb(51,0,157)] to-transparent'></div>
      </div>

      {/* Background animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isMounted ? 0.1 : 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] z-10"
        style={{ y: backgroundY }}
      />

      {/* Gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 0.4 : 0 }}
        transition={{ duration: 0.8 }}
        className='absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0620]/50 to-[#0D0620] z-20'
      />

      {/* Shimmer effect */}
      <motion.div
        variants={shimmerEffect}
        initial='hidden'
        animate={isMounted ? 'visible' : 'hidden'}
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-30'
        style={{
          backgroundSize: '200% 100%',
          mixBlendMode: 'overlay',
        }}
      />

      {/* 内容区域 */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate={isMounted ? 'visible' : 'hidden'}
        className='relative z-40 flex flex-col items-center md:justify-center justify-end h-full px-4 md:pb-0 pb-[15vh]'
      >
        {/* 主标题 */}
        <motion.div
          variants={titleVariants}
          className='text-[32px] leading-tight font-medium text-[#78E7FB] text-center'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-glow px-2 md:px-0'
          >
            Building Trustworthy AI Autonomy
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='text-white text-sm mt-4 font-normal px-4 max-w-[280px] md:max-w-[300px] mx-auto'
          >
            We envision a future where AI Agents and humans co-govern decentralized systems, making decisions that are transparent, consistent, and anchored in history.
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
