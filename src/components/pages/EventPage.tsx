'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useDevice } from '@/utils/device'

const EventPage: React.FC = () => {
  const { isMobile } = useDevice()
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)

  return (
    <div className='min-h-screen flex items-end justify-center relative'>
      {/* 背景图 */}
      <div className='absolute inset-0'>
        <Image
          src={isMobile ? '/images/event-bg-mobile.jpg' : '/images/event-bg.svg'}
          alt='Event Background'
          fill
          style={{
            objectFit: isMobile ? 'contain' : 'cover',
            objectPosition: isMobile ? 'center center' : 'center center',
          }}
          priority
        />
        {/* 渐变层 */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#5E4BFF]'></div>
      </div>

      {/* 内容 */}
      <div className='relative z-10 w-full max-w-6xl mx-auto px-4 mb-12'>
        {/* 标题部分 */}
        <div className='text-center mb-16'>
          <p className={`text-white mb-2 ${isMobile ? 'text-lg' : 'text-2xl'}`}>over</p>
          <p className={`text-white font-bold ${isMobile ? 'text-3xl' : 'text-5xl'}`}>500,000 AIA</p>
        </div>

        {/* 三个按钮区域 */}
        <div className='flex flex-col md:flex-row gap-8 mt-12 items-stretch justify-center'>
          {/* AIRDROP 按钮 */}
          <div className='flex-1 max-w-sm'>
            <button
              className={`w-full h-24 md:h-28 relative overflow-hidden rounded-2xl transition-all duration-300 transform bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm ${
                hoveredButton === 1
                  ? 'border-2 border-purple-400 scale-105'
                  : 'border-2 border-purple-500/30 hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredButton(1)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className='flex items-center justify-between h-full px-6'>
                <div className='text-left flex-1'>
                  <h3 className='text-white font-bold text-lg mb-1'>AIRDROP</h3>
                  <div className='text-white text-sm'>
                    <p>六大奖池，</p>
                    <p>最高<span className='text-cyan-400 font-bold text-base'>10倍以上</span>收益</p>
                  </div>
                </div>
                <div className='flex items-center space-x-1 ml-4'>
                  <Image src='/images/evnet-icon-1.png' alt='Airdrop' width={64} height={64} />
                </div>
              </div>
            </button>
          </div>

          {/* 活期·组合奖励池 按钮 */}
          <div className='flex-1 max-w-sm'>
            <button
              className={`w-full h-24 md:h-28 relative overflow-hidden rounded-2xl transition-all duration-300 transform bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm ${
                hoveredButton === 2
                  ? 'border-2 border-purple-400 scale-105'
                  : 'border-2 border-purple-500/30 hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredButton(2)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className='flex items-center justify-between h-full px-6'>
                <div className='text-left flex-1'>
                  <h3 className='text-white font-bold text-lg mb-1'>活期·组合奖励池</h3>
                  <div className='text-white text-sm'>
                    <p>六大奖池，</p>
                    <p>最高<span className='text-cyan-400 font-bold text-base'>10倍以上</span>收益</p>
                  </div>
                </div>
                <div className='flex items-center space-x-1 ml-4'>
                  <Image src='/images/event-icon-2.png' alt='Airdrop' width={64} height={64} />
                </div>
              </div>
            </button>
          </div>

          {/* 定期·金矿矿池 按钮 */}
          <div className='flex-1 max-w-sm'>
            <button
              className={`w-full h-24 md:h-28 relative overflow-hidden rounded-2xl transition-all duration-300 transform bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm ${
                hoveredButton === 3
                  ? 'border-2 border-purple-400 scale-105'
                  : 'border-2 border-purple-500/40 hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredButton(3)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className='flex items-center justify-between h-full px-6'>
                <div className='text-left flex-1'>
                  <h3 className='text-white font-bold text-lg mb-1'>定期·金矿矿池</h3>
                  <div className='text-white text-sm'>
                    <p>APR</p>
                    <p>超过<span className='text-cyan-400 font-bold text-base'>1825%</span></p>
                  </div>
                </div>
                <div className='flex items-center space-x-1 ml-4'>
                  <Image src='/images/event-icon-3.png' alt='Airdrop' width={64} height={64} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage
