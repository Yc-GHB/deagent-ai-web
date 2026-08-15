'use client'

import { FC } from 'react'
import Image from 'next/image'

export const FlowChart: FC = () => {
  return (
    <section className="w-full px-4 py-12 bg-black bg-[url('/images/work-flow-bg.svg')] bg-cover bg-center">
      <h2 className='text-2xl font-bold text-white text-center mb-4'>
        Why We Need a Feedback<br />Incentive Protocol
      </h2>
      <p className='text-[#A1A1A1] text-center mb-8'>
        To catalyze user engagement and foster high-quality contributions
        by establishing a feedback-driven incentive mechanism that aligns
        individual rewards with collective value enhancement.
      </p>

      <div className='relative w-full aspect-[2/1]'>
        <Image
          src='/images/home-flow.svg'
          alt='Feedback Incentive Protocol Flow'
          fill
          className='object-contain'
          priority
        />
      </div>
    </section>
  )
}
