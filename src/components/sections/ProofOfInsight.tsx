'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    title: 'Insight Contribution',
    description: 'Every user in the network participates in consensus building and enhances model performance by providing insights, such as user behavior, engagement duration, and feedback contributions.',
    image: '/images/proff/proff-1.svg',
  },
  {
    title: 'Resource Optimization',
    description: 'The "Proof of Insight" mechanism integrates user feedback to optimize resource utilization, minimizing unnecessary computational waste.',
    image: '/images/proff/proff-2.svg',
  },
  {
    title: 'Incentive Mechanism',
    description: 'The system allocates platform rewards based on the degree of user contributions, automatically distributing tokens to users\' wallets as a result.',
    image: '/images/proff/proff-3.svg',
  },
]

export function ProofOfInsight() {
  return (
    <div className='py-16 w-full bg-[#0B0032]'>
      <div className='max-w-[960px] mx-auto px-16'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className='text-4xl font-bold text-white'>
            Proof-of-Insight
          </h2>
        </motion.div>

        <div className='space-y-16'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='grid grid-cols-[1fr_1fr] gap-16 items-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className='aspect-[4/3] bg-white/5 rounded-lg relative overflow-hidden'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className='object-contain p-8'
                  priority
                />
              </motion.div>
              <div className='flex flex-col'>
                <h3 className='text-2xl font-semibold text-white mb-4'>
                  {feature.title}
                </h3>
                <p className='text-[#A1A1A1] text-base leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
