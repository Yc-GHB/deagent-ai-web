'use client'

import { motion } from 'framer-motion'

const stats = [
  { number: '520K+', label: 'Daily Active User' },
  { number: '5.5M+', label: 'Unique Active Wallet' },
  { number: '83M', label: 'On-Chain Transactions' },
]

export function Stats() {
  return (
    <div className='w-full bg-gradient-to-b from-[#14034F] to-[#2E07B5]'>
      <div className='max-w-[1280px] mx-auto px-16'>
        <div className='grid grid-cols-3 py-12 gap-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className='text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className='text-[40px] text-[#A898FF] leading-none mb-4'
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + index * 0.1,
                }}
              >
                {stat.number}
              </motion.div>
              <div className='text-[#ffffff] text-[16px]'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
