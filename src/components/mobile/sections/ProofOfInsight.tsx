'use client'

import { FC } from 'react'
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

export const ProofOfInsight: FC = () => {
  return (
    <section className='w-full px-4 py-12 bg-[#0B0032]'>
      <h2 className='text-3xl font-bold text-white text-center mb-12'>
        Proof-of-Insight
      </h2>

      <div className='space-y-12'>
        {features.map((feature, index) => (
          <div key={index} className='space-y-6'>
            <div className='relative w-[calc(100vw-32px)] h-[calc(100vw-32px)] bg-white/5 rounded-lg overflow-hidden'>
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className='object-contain'
                priority
              />
            </div>
            <div>
              <h3 className='text-2xl font-semibold text-white mb-3'>
                {feature.title}
              </h3>
              <p className='text-[#A1A1A1] text-base leading-relaxed'>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
