'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function WhyAIFails() {
  return (
    <section className='w-full relative py-16 md:py-24 bg-[#1A0B4B]'>
      {/* 背景渐变色和图片 */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-x-0 top-0 h-full w-full bg-[#1A0B4B]'></div>
        <div className='absolute -top-[70px] left-0 right-0 h-[200px] flex justify-center'>
          <Image
            src='/images/home/div-block.svg'
            alt='decorative divider'
            width={520}
            height={70}
            className='object-contain'
          />
        </div>
      </div>

      <div className='max-w-[1024px] mx-auto px-4 md:px-6 relative z-10'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          className='text-center mb-12 md:mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
            Why Decentralized AI Fails Today
          </h2>
        </motion.div>

        {/* Three Challenges Cards */}
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'
        >
          {/* Consensus Card */}
          <motion.div

            className='p-2 md:p-8]'
          >
            <div className='flex flex-col h-full'>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>Consensus:</h3>
              <h4 className='text-lg md:text-xl font-medium mb-4'>The &ldquo;Multiple Personality&rdquo; Dilemma</h4>
              <p className='text-sm leading-relaxed mt-auto'>
                AI Agents, unlike traditional nodes, can produce different results on different devices due to small computational variances. This creates challenges in reaching consensus when decisions are not deterministic.
              </p>
            </div>
          </motion.div>

          <hr className='md:hidden'/>

          {/* Identity Card */}
          <motion.div

            className='p-2 md:p-8]'
          >
            <div className='flex flex-col h-full'>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>Identity:</h3>
              <h4 className='text-lg md:text-xl font-medium mb-4'>Split Decision-Maker</h4>
              <br className='hidden md:block'/>
              <p className='text-sm leading-relaxed'>
                AI Agents may give contradictory answers to the same question, disrupting consistency. Ensuring decision traceability and output consistency is key to maintaining agent reliability.
              </p>
            </div>
          </motion.div>

          <hr className='md:hidden'/>

          {/* Continuity Card */}
          <motion.div

            className='p-2 md:p-8]'
          >
            <div className='flex flex-col h-full'>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>Continuity:</h3>
              <h4 className='text-lg md:text-xl font-medium mb-4'>Agent Without Memory</h4>
              <br className='hidden md:block'/>
              <p className='text-sm leading-relaxed'>
                AI Agents face limitations in state persistence and context management, which prevent knowledge accumulation across sessions. A lack of memory can disrupt decision continuity and consistency.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
