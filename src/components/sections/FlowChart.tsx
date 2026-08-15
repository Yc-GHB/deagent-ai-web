'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const FlowChart: FC = () => {
  return (
    <section className='bg-black py-24 mx-auto bg-[url("/images/work-flow-bg.svg")] bg-cover bg-center w-full'>
      <div className='max-w-[960px] mx-auto px-8'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold text-white mb-4'>
            Why We Need a Feedback<br />Incentive Protocol
          </h2>
          <p className='text-[#A1A1A1] mx-auto'>
            To catalyze user engagement and foster high-quality contributions
            by establishing a feedback-driven incentive mechanism that aligns
            individual rewards with collective value enhancement.
          </p>
        </motion.div>

        <motion.div
          className='relative w-full aspect-[2/1]'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src='/images/home-flow.svg'
            alt='Feedback Incentive Protocol Flow'
            fill
            className='object-contain'
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
