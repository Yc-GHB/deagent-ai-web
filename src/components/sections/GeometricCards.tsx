'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'Pro AI Feedback Mechanism',
    subtitle: 'Incentive Protocol in Web3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    shape: 'octagon',
  },
  {
    title: 'Pro AI Feedback Mechanism',
    subtitle: 'Incentive Protocol in Web3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    shape: 'diamond',
  },
  {
    title: 'Pro AI Feedback Mechanism',
    subtitle: 'Incentive Protocol in Web3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    shape: 'cube',
  },
]

export const GeometricCards: FC = () => {
  return (
    <div className='py-24 sm:py-32 bg-black'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className='relative group'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className='relative h-[400px] flex flex-col justify-end p-6 bg-gradient-to-b from-transparent to-black/60 overflow-hidden rounded-2xl'>
                <div className='absolute inset-0 -z-10'>
                  {/* Add 3D geometric images or components here */}
                  <div className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-80' />
                </div>
                <h3 className='text-xl font-semibold text-white mb-2'>{card.title}</h3>
                <p className='text-sm text-indigo-300 mb-4'>{card.subtitle}</p>
                <p className='text-sm text-gray-300'>{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
