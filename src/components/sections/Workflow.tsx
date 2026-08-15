'use client'

import { FC } from 'react'

const steps = [
  {
    name: 'Visit Website',
    description: 'Open our website homepage',
  },
  {
    name: 'Check Time',
    description: 'View current time in a prominent position',
  },
  {
    name: 'Learn More',
    description: 'Explore more features and functionalities',
  },
]

export const Workflow: FC = () => {
  return (
    <div className='py-24 sm:py-32' id='workflow'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-base font-semibold leading-7 text-indigo-400'>Workflow</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
            Three simple steps to get started
          </p>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            We provide a simple and intuitive workflow to help you get time information easily
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {steps.map(step => (
              <div key={step.name} className='flex flex-col items-start'>
                <div className='rounded-md bg-white/5 p-2 ring-1 ring-white/10'>
                  <svg
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </div>
                <dt className='mt-4 font-semibold text-white'>{step.name}</dt>
                <dd className='mt-2 leading-7 text-gray-400'>{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
