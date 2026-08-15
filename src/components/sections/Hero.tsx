'use client'

import { FC, useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'


const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}


export const Hero: FC = () => {
  const { scrollY } = useScroll()
  const [isMounted, setIsMounted] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleScrollToNext = () => {
    const nextY = window.scrollY + window.innerHeight
    window.scrollTo({ top: nextY, behavior: 'smooth' })
  }

  // 视差效果
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const contentY = useTransform(scrollY, [0, 500], [0, -50])

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isMounted ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className='relative h-screen overflow-hidden flex flex-col-reverse'
    >
      {/* 视频背景 */}
      <div className='absolute inset-0 w-full h-full z-0 overflow-hidden'>
        <div className='w-full h-full overflow-hidden video-container'>
          {/* 视频加载占位图 */}
          {!isVideoLoaded && (
            <img
              src='/videos/video-loading.png'
              alt='Loading'
              className='absolute inset-0 w-full h-full object-cover'
              style={{ borderRadius: 'inherit' }}
            />
          )}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className={`absolute inset-0 w-full h-full object-cover ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ borderRadius: 'inherit' }}
            onCanPlay={() => setIsVideoLoaded(true)}
          >
            <source src='/videos/hero-background.mp4' type='video/mp4' />
            {/* 如果视频无法播放，回退到背景图 */}
            <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
          </video>
        </div>
        {/* 添加一个覆盖层，使视频不会太抢眼 */}
        <div className='absolute inset-0 bg-black/30'></div>
        {/* 底部渐变色 */}
        <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgb(51,0,157)] to-transparent'></div>
      </div>

      {/* Background pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isMounted ? 0.2 : 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] z-10"
        style={{ y: backgroundY }}
      />

      {/* Gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 0.6 : 0 }}
        transition={{ duration: 0.8 }}
        className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-20'
      />

      {/* Main content */}
      <motion.div
        className='flex-1 flex items-end pb-16 relative z-30'
        style={{ y: contentY }}
      >
        <div className='w-full relative'>
          <div className='max-w-[1024px] mx-auto'>
            <div className='flex justify-center items-center'>
              <motion.div
                variants={textVariants}
                initial='hidden'
                animate={isMounted ? 'visible' : 'hidden'}
                className='flex flex-col justify-end h-full'
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className='text-glow w-full text-[48px] text-center'
                >
                  Building Trustworthy AI Autonomy
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className='text-white text-base mt-4 font-normal text-center w-[660px]'
                >
                  We envision a future where AI Agents and humans co-govern decentralized systems, making decisions that are transparent, consistent, and anchored in history.
                </motion.span>
              </motion.div>

            </div>
            {/* 底部箭头提示（位于文案下方） */}
            <div className='flex justify-center mt-6'>
              <img
                src='/images/home/arrow.svg'
                alt='Scroll down'
                role='button'
                tabIndex={0}
                onClick={handleScrollToNext}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleScrollToNext()
                  }
                }}
                className='w-8 h-8 opacity-80 animate-fade-blink cursor-pointer'
                aria-label='Scroll to next section'
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
