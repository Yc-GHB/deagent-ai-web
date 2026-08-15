'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// 动画变体
const fadeIn = {
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

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.98,
  },
}

export default function EmbraceAI() {
  return (
    <section className='py-24 md:pt-32 md:pb-16 relative overflow-hidden mx-[12px] rounded-b-[12px] md:h-[580px] flex items-center'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full'
          style={{ backgroundImage: "url('/images/footer-bg.jpeg')" }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[#1A0B4B]/70 via-[#330099]/30 to-[#1A0B4B]/80' />
      </div>

      {/* 背景渐变色 */}
      <div className='absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[rgb(0,0,0)]/40 to-transparent z-0'></div>

      <div className='max-w-[1024px] mx-auto px-4 md:px-6 relative z-10 mt-[180px]'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          className='text-center'
        >
          <h2 className='text-[36px] md:text-[36px] lg:text-[36px] font-bold text-white mb-6 tracking-wide'>
            Let&apos;s Embrace the AI Agent Era
          </h2>
          <p className='text-base md:text-lg max-w-[800px] mx-auto mb-16 leading-relaxed text-gray-300'>
            DeAgentAI envisions a future where AI Agents actively participate in decentralized governance, making verifiable and consensus-driven decisions across diverse ecosystems.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-6 mt-8'>
            <motion.div
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
            >
              <Link
                href='/ai-agent'
                className='inline-block bg-black text-white font-medium py-4 px-12 rounded-md transition-all border border-transparent hover:border-[#78E7FB]/30 min-w-[180px]'
              >
                AI Agent
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover='hover'
              whileTap='tap'
              custom={1}
            >
              <Link
                href='/event'
                className='inline-block bg-black text-white font-medium py-4 px-12 rounded-md transition-all border border-transparent hover:border-[#78E7FB]/30 min-w-[180px]'
              >
                EVENTS
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
