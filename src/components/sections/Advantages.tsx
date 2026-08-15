'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const advantages = [
  {
    title: 'First AI Feedback Mechanism',
    subtitle: 'Incentive Protocol in Web3',
    description: 'The focus is on addressing real-world challenges in trading, specifically tackling the distinct pain points of both primary and secondary markets.',
    image: '/octagon.png',
    width: 405,
    height: 405,
    align: 'right',
  },
  {
    title: 'First AI Feedback Mechanism',
    subtitle: 'Incentive Protocol in Web3',
    description: 'The focus is on addressing real-world challenges in trading, specifically tackling the distinct pain points of both primary and secondary markets.',
    image: '/cone.png',
    width: 405,
    height: 405,
    align: 'left',
  },
  {
    title: 'First AI Feedback Mechanism',
    subtitle: 'Incentive Protocol in Web3',
    description: 'The focus is on addressing real-world challenges in trading, specifically tackling the distinct pain points of both primary and secondary markets.',
    image: '/cube.png',
    width: 405,
    height: 405,
    align: 'right',
  },
]

export function Advantages() {
  return (
    <div className='w-full bg-black py-24 sm:py-32'>
      <div className='max-w-[1280px] mx-auto px-6 lg:px-8'>
        {advantages.map((advantage, index) => (
          <motion.div
            key={index}
            className='mb-32 last:mb-0'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`grid grid-cols-2 gap-x-[120px] items-center ${
              advantage.align === 'left' ? 'direction-rtl' : ''
            }`}>
              <div className={`${advantage.align === 'left' ? 'order-2' : ''}`}>
                <span className='text-[12px] font-medium mb-4 block bg-[#00F2FF] text-black px-3 py-1 rounded-full w-fit'>
                  ADVANTAGE
                </span>
                <h2 className='text-[28px] font-bold text-white mb-4'>
                  {advantage.title}
                </h2>
                <h3 className='text-[28px] font-semibold text-white mb-6'>
                  {advantage.subtitle}
                </h3>
                <p className='text-[14px] text-gray-400'>
                  {advantage.description}
                </p>
              </div>
              <div className={`${advantage.align === 'left' ? 'order-1' : ''}`}>
                <motion.div
                  className='relative w-[405px] h-[405px]'
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={advantage.image}
                    alt={advantage.title}
                    width={advantage.width}
                    height={advantage.height}
                    className='w-full h-full object-contain'
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className='text-center mt-32'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className='text-[12px] font-medium mb-4 block bg-[#00F2FF] text-black px-3 py-1 rounded-full mx-auto w-fit'>
            ADVANTAGE
          </span>
          <h2 className='text-[28px] font-bold text-white'>
            All-Round Excellence in Product,<br />
            Technology, and Team.
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
