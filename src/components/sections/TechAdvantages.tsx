'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    name: 'Advanced AI',
    description: 'Cutting-edge AI technology that powers intelligent decision-making.',
    icon: '/icons/ai.svg',
    width: 48,
    height: 48,
  },
  {
    name: 'Blockchain Integration',
    description: 'Seamless integration with multiple blockchain networks.',
    icon: '/icons/blockchain.svg',
    width: 48,
    height: 48,
  },
  {
    name: 'Security',
    description: 'Enterprise-grade security protecting your assets.',
    icon: '/icons/security.svg',
    width: 48,
    height: 48,
  },
]

export function TechAdvantages() {
  return (
    <div className='bg-black py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-base font-semibold leading-7 text-indigo-400'>Technology</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Technical Advantages
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            Powered by cutting-edge technology to deliver the best experience.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map(feature => (
              <motion.div
                key={feature.name}
                className='flex flex-col'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-white'>
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    width={feature.width}
                    height={feature.height}
                    className='h-5 w-5 flex-none text-indigo-400'
                  />
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300'>
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
