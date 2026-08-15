'use client'

import { FC } from 'react'

const benefits = [
  {
    name: 'High Precision',
    description: 'Using high-precision time sources to ensure accurate time display',
  },
  {
    name: 'User-Friendly',
    description: 'Clean and intuitive interface design for quick access to time information',
  },
  {
    name: 'Reliability',
    description: 'Built on a reliable tech stack to ensure stable system operation',
  },
  {
    name: 'Aesthetics',
    description: 'Carefully designed UI interface providing excellent visual experience',
  },
  {
    name: 'Responsive',
    description: 'Perfect adaptation to various device screens for checking time anywhere',
  },
]

export const Benefits: FC = () => {
  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-2xl lg:text-center'>
        <h2 className='text-base font-semibold leading-7 text-indigo-600'>Benefits</h2>
        <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Everything you need to know about our service
        </p>
        <p className='mt-6 text-lg leading-8 text-gray-600'>
          We provide a comprehensive time service solution that meets your needs
        </p>
      </div>
      <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
        <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3'>
          {benefits.map(benefit => (
            <div key={benefit.name} className='flex flex-col'>
              <dt className='flex items-center gap-x-3 text-base font-semibold leading-7'>
                {benefit.name}
              </dt>
              <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                <p className='flex-auto'>{benefit.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
