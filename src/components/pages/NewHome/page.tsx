'use client'
import { Hero } from '@/components/sections/Hero'
import Partner from './components/Partner'
import Architecture from './components/Architecture'
import { useDevice } from '@/utils/device'
import { Hero as MobileHero } from '@/components/mobile/sections/Hero'
import { motion } from 'framer-motion'
import Mission from './components/Mission'
import EmbraceAI from './components/EmbraceAI'
import { useEffect, useState } from 'react'

export function NewHome() {
  const { isMobile } = useDevice()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 确保组件已挂载
    setIsLoaded(true)
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className='mx-[12px] rounded-b-[12px]'
      >
        {isMobile ? <MobileHero /> : <Hero />}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='pb-0 bg-black'
      >
        <Partner />
        <Mission />
      </motion.div>

      {/* 新增的组件 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className='bg-black'
      >
        <Architecture />
      </motion.div>

      {/* 新增的组件 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className='bg-black'
      >
        <EmbraceAI />
      </motion.div>
    </>
  )
}
