'use client'

import { motion } from 'framer-motion'

const features = [
  {
    shape: 'octagon',
    title: 'First AI Feedback Mechanism Incentive Protocol in Web3',
    description: 'The focus is on addressing real-world challenges in trading, specifically tackling the distinct pain points of both primary and secondary markets.',
  },
  {
    shape: 'triangle',
    title: 'First AI Feedback Mechanism Incentive Protocol in Web3',
    description: 'The focus is on addressing real-world challenges in trading, specifically tackling the distinct pain points of both primary and secondary markets.',
  },
  {
    shape: 'square',
    title: 'First AI Feedback Mechanism Incentive Protocol in Web3',
    description: 'The focus is on addressing real-world challenges in trading, specifically tackling the distinct pain points of both primary and secondary markets.',
  },
]

export function FeedbackProtocol() {
  return (
    <div className='bg-black py-16'>
      <div className='max-w-[1440px] mx-auto px-16'>
        {features.map((feature, index) => (
          <div key={index} className='grid grid-cols-2 gap-16 mb-16 last:mb-0'>
            <div className={`aspect-square ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
              {feature.shape === 'octagon' && (
                <div className='w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg'></div>
              )}
              {feature.shape === 'triangle' && (
                <div className='w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 transform rotate-180'></div>
              )}
              {feature.shape === 'square' && (
                <div className='w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg'></div>
              )}
            </div>
            <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
              <div className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'>
                ADVANTAGE
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='text-4xl font-bold text-white mb-4'
              >
                {feature.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='text-[#A1A1A1] leading-relaxed'
              >
                {feature.description}
              </motion.p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
