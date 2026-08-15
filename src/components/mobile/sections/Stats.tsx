'use client'

import { FC } from 'react'

const stats = [
  { number: '520K+', label: 'Daily Active User' },
  { number: '5.5M+', label: 'Unique Active Wallet' },
  { number: '83M', label: 'On-Chain Transactions' },
]

export const Stats: FC = () => {
  return (
    <section className='w-full bg-gradient-to-b from-[#14034F] to-[#2E07B5] px-4 py-12'>
      <div className='grid grid-cols-1 gap-8'>
        {stats.map((stat, index) => (
          <div key={index} className='text-center'>
            <div className='text-[32px] text-[#A898FF] leading-none mb-2'>
              {stat.number}
            </div>
            <div className='text-[#ffffff] text-[14px]'>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
