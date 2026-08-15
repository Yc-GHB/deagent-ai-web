'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { motion } from 'framer-motion'
import { useDevice } from '@/utils/device'

// 十字装饰组件
const CrossDecoration = () => {
  const { isMobile } = useDevice()

  // 移动端不展示十字装饰
  if (isMobile) {return null}

  return (
    <>
      {/* 左上角 */}
      <div className='fixed top-0 left-0 w-6 h-6 z-10'>
        <div className='absolute top-0 left-0 w-px h-3 bg-white/20'></div>
        <div className='absolute top-0 left-0 w-3 h-px bg-white/20'></div>
      </div>
      {/* 右上角 */}
      <div className='fixed top-0 right-0 w-6 h-6 z-10'>
        <div className='absolute top-0 right-0 w-px h-3 bg-white/20'></div>
        <div className='absolute top-0 right-0 w-3 h-px bg-white/20'></div>
      </div>
      {/* 左下角 */}
      <div className='fixed bottom-0 left-0 w-6 h-6 z-10'>
        <div className='absolute bottom-0 left-0 w-px h-3 bg-white/20'></div>
        <div className='absolute bottom-0 left-0 w-3 h-px bg-white/20'></div>
      </div>
      {/* 右下角 */}
      <div className='fixed bottom-0 right-0 w-6 h-6 z-10'>
        <div className='absolute bottom-0 right-0 w-px h-3 bg-white/20'></div>
        <div className='absolute bottom-0 right-0 w-3 h-px bg-white/20'></div>
      </div>
    </>
  )
}

// 产品卡片组件
const ProductCard = ({
  title,
  description,
  imageSrc,
  learnMoreUrl,
}: {
  title: string;
  description: string;
  imageSrc: string;
  learnMoreUrl: string;
}) => {
  const { isMobile } = useDevice()

  // 处理描述文本中的换行符
  const descriptionParagraphs = description.split('\n\n')

  return (
    <div className='relative w-full mx-auto overflow-hidden'>
      <div className={`w-full ${isMobile ? 'flex-col h-auto' : 'flex-row h-[304px]'} flex mx-auto py-[32px] relative`}>
        {/* 图片区域 */}
        <div className={`${isMobile ? 'w-full' : 'w-[40%]'} h-full relative`}>
          <div className='h-full flex items-center justify-center'>
            <div className={`relative w-full ${isMobile ? 'h-[200px]' : 'h-[240px]'}`}>
              <Image
                src={imageSrc}
                alt={title}
                fill
                style={{ objectFit: 'contain' }}
                className='rounded-[32px]'
              />
            </div>
          </div>
        </div>

        {/* 文字区域 */}
        <div className={`${isMobile ? 'w-full mt-4 text-center px-4' : 'w-[60%] pr-6'} h-full flex flex-col justify-center`}>
          <h2 className='text-[32px] mb-2'>{title}</h2>
          <div className='text-gray-300 text-[12px] overflow-y-auto' style={{ maxHeight: isMobile ? '100%' : '180px' }}>
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index} className={index < descriptionParagraphs.length - 1 ? 'mb-1 text-[#A2A2A2]' : 'text-[#A2A2A2]'}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={`mt-4 ${isMobile ? 'flex justify-center' : ''}`}>
            <Button href={learnMoreUrl} className='h-[42px] bg-[#00F2FF] hover:bg-[#00B8D4] text-black'>
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// TRUESIGHTS 版块
const TruesightsSection = () => {
  const { isMobile } = useDevice()

  return (
    <section className='w-full border-y border-[#434343] relative'>
      <div className='w-full flex justify-center relative'>
        <div className='max-w-[1280px] w-full flex justify-center'>
          <div className='w-[840px] relative border-x border-[#434343]'>
            {/* 装饰十字 - 移动端不显示 */}
            {!isMobile && (
              <>
                <div className='absolute -top-[7.5px] -left-[7.5px] z-10'>
                  <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                </div>
                <div className='absolute -top-[7.5px] -right-[7.5px] z-10'>
                  <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                </div>
                <div className='absolute -bottom-[7.5px] -left-[7.5px] z-10'>
                  <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                </div>
                <div className='absolute -bottom-[7.5px] -right-[7.5px] z-10'>
                  <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                </div>
              </>
            )}

            <div className={`w-full ${isMobile ? 'flex-col h-auto' : 'flex-row h-[360px]'} flex mx-auto py-[32px] relative`}>
              {/* 左侧图片 */}
              <div className={`${isMobile ? 'w-full' : 'w-[40%]'} h-full relative px-6`}>
                <div className='h-full flex items-center justify-center'>
                  <div className={`relative w-full ${isMobile ? 'h-[200px]' : 'h-[260px]'}`}>
                    <Image
                      src='/images/products/TRUESIGHTS.svg'
                      alt='TRUESIGHTS'
                      fill
                      style={{ objectFit: 'contain' }}
                      className='rounded-[24px]'
                    />
                  </div>
                </div>
              </div>

              {/* 右侧内容 */}
              <div className={`${isMobile ? 'w-full px-6 mt-4 text-center' : 'w-[60%] pr-10'} h-full flex flex-col justify-center`}>
                <h3 className='text-[28px] md:text-[32px] mb-2'>TRUESIGHTS</h3>
                <p className='text-[#A2A2A2] text-[12px] mb-4'>
                  Truesights is an AI-powered info-fi network designed to make online markets more efficient by accurately
                  identifying and rewarding each user&apos;s genuine insight and perception. Currently in MVP stage and will officially
                  start testing and launching in Q4 2025.
                </p>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-3 text-[12px] text-[#A2A2A2]'>
                    <span className='mt-1 inline-block w-2 h-2 rounded-full bg-[#00F2FF]'></span>
                    <span>AI Oracles: Agents generate real-time, data-driven predictions</span>
                  </li>
                  <li className='flex items-start gap-3 text-[12px] text-[#A2A2A2]'>
                    <span className='mt-1 inline-block w-2 h-2 rounded-full bg-[#00F2FF]'></span>
                    <span>Open Topic Creation: Predict anything — no permissions needed</span>
                  </li>
                  <li className='flex items-start gap-3 text-[12px] text-[#A2A2A2]'>
                    <span className='mt-1 inline-block w-2 h-2 rounded-full bg-[#00F2FF]'></span>
                    <span>On-Chain Transparency: All signals and results are verifiable</span>
                  </li>
                </ul>
                <div className={`mt-6 ${isMobile ? 'flex justify-center' : ''}`}>
                  <Button className='h-[42px] text-white bg-[#0E3F42] border-2 border-[#00F2FF] cursor-not-allowed pointer-events-none'>
                    COMING SOON...
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 产品页面横幅组件
const ProductBanner = ({
  isLoaded,
}: {
  isLoaded: boolean
}) => {
  return (
    <div className='relative h-[550px] flex items-center justify-center overflow-hidden'>
      {/* 背景图层 */}
      <div className='absolute inset-0 w-full h-full'>
        <div className='relative h-full w-[calc(100%-24px)] mx-auto rounded-b-[32px] overflow-hidden'>
          <Image
            src='/images/products/hero-bg.png'
            alt='Background Pattern'
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 渐变蒙层 - 确保文字可见 */}
      <div className='absolute inset-0 w-full h-full'>
        <div className='relative h-full w-[calc(100%-24px)] mx-auto rounded-b-[32px] overflow-hidden bg-gradient-to-t from-[rgba(88,28,135,0.8)] via-[rgba(45,19,85,0.6)] to-transparent'>
          {/* 额外蒙层图片 - 仅覆盖底部15% */}
          <div className='absolute bottom-0 left-0 w-full h-[15%]'>
            <Image
              src='/images/products/mask.png'
              alt='Mask Overlay'
              fill
              priority
              style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
            />
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 0.8 }}
        className='relative z-20 text-center mx-[12px] mt-[220px]'
      >
        <p className='text-[54px] md:text-[64px] mb-4 text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>PRODUCTS</p>
        <p className='text-[16px] md:text-[18px] text-white max-w-2xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'>
          The Agent Stock for Web3: Agents you can trust, fork, and govern.
        </p>
      </motion.div>
    </div>
  )
}

export function ProductsPage() {
  const { isMobile } = useDevice()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 产品数据
  const products = [
    {
      title: 'ALPHA X',
      description: 'The first AI model developed through the DeAgentAI feedback training mechanism, incubated by the community.\n\nDesigned to revolutionize crypto trading with precise market predictions and automated strategies, AlphaX is pioneering a new paradigm of intelligent, self-evolving trading agents.',
      imageSrc: '/images/products/alphax.svg',
      learnMoreUrl: 'https://alpha-x.ai/',
    },
    {
      title: 'CORRAI',
      description: 'An ecosystem product by DeAgentAI — a no-code DeFi quant agent for the Web3 era.\n\nCorrAI enables users to explore, build, and deploy customizable trading strategies with ease, lowering the barrier to quant trading and unlocking new possibilities for every market participant.',
      imageSrc: '/images/products/corrai.svg',
      learnMoreUrl: 'https://corr.ai/',
    },
  ]

  // 旧小产品区已移除

  return (
    <div className='bg-black text-white min-h-screen relative'>
      {/* 全局十字装饰 */}
      <CrossDecoration />

      {/* 只保留左下角的十字图标 - 移动端不显示 */}
      {!isMobile && (
        <div className='fixed bottom-6 left-6 z-10'>
          <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
        </div>
      )}

      {/* 英雄区域 - 全宽度显示 */}
      <section className='w-full relative'>
        <ProductBanner isLoaded={isLoaded} />
      </section>

      {/* 产品展示区域容器 */}
      <div className='flex flex-col items-center mt-[32px]'>
        {/* ALPHA X 产品区域 */}
        <section className='w-full border-t border-[#434343] relative'>
          <div className='w-full flex justify-center'>
            <div className='max-w-[1280px] mx-auto md:px-6 w-full flex justify-center'>
              <div className='w-[840px] border-x border-[#434343] relative'>
                {/* ALPHA X 区域左上十字 - 移动端不显示 */}
                {!isMobile && (
                  <div className='absolute -top-[7.5px] -left-[7.5px] z-10'>
                    <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                  </div>
                )}
                {/* ALPHA X 区域右上十字 - 移动端不显示 */}
                {!isMobile && (
                  <div className='absolute -top-[7.5px] -right-[7.5px] z-10'>
                    <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                  </div>
                )}
                <ProductCard
                  title={products[0].title}
                  description={products[0].description}
                  imageSrc={products[0].imageSrc}
                  learnMoreUrl={products[0].learnMoreUrl}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CORRAI 产品区域 */}
        <section className='w-full border-t border-[#434343] relative'>
          <div className='w-full flex justify-center'>
            <div className='max-w-[1280px] mx-auto md:px-6 w-full flex justify-center'>
              <div className='w-[840px] border-x border-[#434343] relative'>
                {/* CORRAI 区域左上十字 - 移动端不显示 */}
                {!isMobile && (
                  <div className='absolute -top-[7.5px] -left-[7.5px] z-10'>
                    <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                  </div>
                )}
                {/* CORRAI 区域右上十字 - 移动端不显示 */}
                {!isMobile && (
                  <div className='absolute -top-[7.5px] -right-[7.5px] z-10'>
                    <Image src='/images/products/ten.svg' width={15} height={15} alt='decoration' />
                  </div>
                )}
                <ProductCard
                  title={products[1].title}
                  description={products[1].description}
                  imageSrc={products[1].imageSrc}
                  learnMoreUrl={products[1].learnMoreUrl}
                />
              </div>
            </div>
          </div>
        </section>

        {/* TURESIGHTS 版块 */}
        <TruesightsSection />
      </div>
    </div>
  )
}
