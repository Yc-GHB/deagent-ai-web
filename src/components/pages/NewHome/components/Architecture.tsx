'use client'

import WhyAIFails from '@/components/pages/NewHome/components/WhyAIFails'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

// 动画变体
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    scale: 1.05,
    filter: 'drop-shadow(0 0 12px rgba(120, 231, 251, 0.5))',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// 添加滑动动画变体
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

export default function Architecture() {
  const [isHoverIcon1, setIsHoverIcon1] = useState(false)
  const [isHoverIcon2, setIsHoverIcon2] = useState(false)
  const [isHoverIcon3, setIsHoverIcon3] = useState(false)
  const [activeDescription, setActiveDescription] = useState(0)
  const [[, direction], setPage] = useState([0, 0])
  const [, setDirection] = useState(0)
  const [currentMobileCard, setCurrentMobileCard] = useState(0)

  // 三个不同的卡片内容
  const cardContents = [
    {
      title: 'The DeAgent Core',
      description: "DeAgent's foundation combines Lobe, Memory, and Tools. A Developer configures these modules to deliver flexible, adaptive intelligence capable of handling a wide range of tasks.",
      image: '/images/home/right-1.svg',
      imageWidth: 317,
      imageHeight: 300,
    },
    {
      title: 'Interaction & Distribution',
      description: 'Users connect through the Agent Interface, with a Selector routing requests to the right models or tools. Meanwhile, a Distributed System underpins the entire process, ensuring robust, scalable performance across multiple nodes and environments.',
      image: '/images/home/right-2.svg',
      imageWidth: 340,
      imageHeight: 308,
    },
    {
      title: 'Consensus & Tokenization',
      description: 'Execution requests pass through a Screening Mechanism, Executor Nodes, and Validators, all secured by a Hybrid POS/POW model. A Memory NFT logs final results, and a Token Incentive Economic Model rewards participants for providing compute, validation, and model services, aligning everyone under a decentralized, trustless framework.',
      image: '/images/home/right-3.svg',
      imageWidth: 580,
      imageHeight: 380,
    },
  ]

  // 处理移动端滑动
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollLeft = container.scrollLeft
    const cardWidth = 300 // 卡片宽度
    const gap = 16 // 卡片间距
    const totalWidth = cardWidth + gap

    // 计算当前显示的卡片索引
    const index = Math.round(scrollLeft / totalWidth)
    if (index !== currentMobileCard) {
      setCurrentMobileCard(index)
      // 自动触发对应图标的hover效果
      setIsHoverIcon1(index === 0)
      setIsHoverIcon2(index === 1)
      setIsHoverIcon3(index === 2)
      // 同步PC端的激活状态
      setActiveDescription(index)
    }
  }

  const handleMouseEnter = (index: number) => {
    if (index === 0) {setIsHoverIcon1(true)}
    if (index === 1) {setIsHoverIcon2(true)}
    if (index === 2) {setIsHoverIcon3(true)}
    setDirection(index - activeDescription)
    setPage([index, index - activeDescription])
    setActiveDescription(index)
  }

  const handleMouseLeave = (index: number) => {
    if (index === 0) {setIsHoverIcon1(false)}
    if (index === 1) {setIsHoverIcon2(false)}
    if (index === 2) {setIsHoverIcon3(false)}
    // 不重置activeDescription，保持最后悬停的描述
  }

  return (
    <section className='relative mx-[12px] rounded-t-[12px]'>
      <WhyAIFails />
      {/* 背景渐变色 */}
      <div className='absolute inset-0'>
        {/* 主渐变层 */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#5100D2] via-[#1A0B4B] to-[#1A0B4B]'></div>
      </div>

      {/* How to Deploy Trustworthy AI Agents */}
      <div className='max-w-[1024px] mx-auto px-4 md:px-6 relative z-10'>
        {/* PC端标题和图标 */}
        <div className='hidden md:block'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className='text-center mb-12 md:mb-16'
          >
            <h2 className='text-[24px] text-white mb-4 md:mb-6'>
              How to Deploy Trustworthy AI Agents
            </h2>
            <p className='text-gray-400 text-sm md:text-base max-w-[600px] mx-auto'>
              AI Agents That Work for Humans, Not Against Them.
            </p>
          </motion.div>

          {/* 3 Step Process Icons - PC端显示 */}
          <div className='max-w-[600px] mx-auto mb-4 md:mb-8 px-4 md:px-0'>
            <div className='grid grid-cols-5 gap-0'>
              {/* 图片行 - 所有图片水平对齐 */}
              <div className='flex justify-center items-center h-[40px] md:h-[60px]'>
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={iconVariants}
                  whileHover='hover'
                  onMouseEnter={() => handleMouseEnter(0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                  className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]'
                >
                  <Image
                    src={isHoverIcon1 || activeDescription === 0 ? '/images/home/icon-1.hover.png' : '/images/home/icon-1.png'}
                    alt='DeAgent'
                    width={60}
                    height={60}
                    className='object-contain'
                  />
                </motion.div>
              </div>

              <div className='flex justify-center items-center h-[40px] md:h-[60px]'>
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={iconVariants}
                  className='w-[60px] md:w-[80px]'
                >
                  <Image
                    src='/images/home/icon-line-1.png'
                    alt='Connection Line'
                    width={80}
                    height={20}
                    className='object-contain w-full'
                  />
                </motion.div>
              </div>

              <div className='flex justify-center items-center h-[40px] md:h-[60px]'>
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={iconVariants}
                  whileHover='hover'
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                  className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]'
                >
                  <Image
                    src={isHoverIcon2 || activeDescription === 1 ? '/images/home/icon-2.hover.png' : '/images/home/icon-2.png'}
                    alt='Distributed System'
                    width={60}
                    height={60}
                    className='object-contain'
                  />
                </motion.div>
              </div>

              <div className='flex justify-center items-center h-[40px] md:h-[60px]'>
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={iconVariants}
                  className='w-[60px] md:w-[80px]'
                >
                  <Image
                    src='/images/home/icon-line-2.png'
                    alt='Connection Line'
                    width={80}
                    height={20}
                    className='object-contain w-full'
                  />
                </motion.div>
              </div>

              <div className='flex justify-center items-center h-[40px] md:h-[60px]'>
                <motion.div
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={iconVariants}
                  whileHover='hover'
                  onMouseEnter={() => handleMouseEnter(2)}
                  onMouseLeave={() => handleMouseLeave(2)}
                  className='w-[40px] h-[40px] md:w-[60px] md:h-[60px]'
                >
                  <Image
                    src={isHoverIcon3 || activeDescription === 2 ? '/images/home/icon-3.hover.png' : '/images/home/icon-3.png'}
                    alt='DeAgent Modular Layer 2 Network'
                    width={60}
                    height={60}
                    className='object-contain'
                  />
                </motion.div>
              </div>

              {/* 文字行 - 所有文字在图片下方 */}
              <div className='text-center pt-4'>
                <span className='text-white text-sm w-[80px] inline-block'>DeAgent</span>
              </div>

              <div className='text-center pt-4'>
                {/* 连接线下方无文字 */}
              </div>

              <div className='text-center pt-4'>
                <span className='text-white text-sm w-[80px] inline-block'>Distributed System</span>
              </div>

              <div className='text-center pt-4'>
                {/* 连接线下方无文字 */}
              </div>

              <div className='text-center pt-4'>
                <span className='text-white text-sm w-[120px] inline-block'>DeAgent Modular Layer 2 Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端滑动卡片 */}
        <div className='block md:hidden'>
          <div
            className='overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide'
            onScroll={handleScroll}
          >
            <div className='flex gap-4 w-max snap-x snap-mandatory'>
              {cardContents.map((content, index) => (
                <motion.div
                  key={index}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className='w-[300px] flex-shrink-0 snap-center bg-[#0F0326]/50 backdrop-blur-sm rounded-lg border border-[#78E7FB]/10 overflow-hidden'
                >
                  <div className='p-4 h-[260px] overflow-y-auto scrollbar-hide'>
                    <h3 className='text-xl font-bold text-white mb-3'>{content.title}</h3>
                    <p className='text-gray-400 text-sm'>{content.description}</p>
                  </div>
                  <div className='h-[200px] flex items-center justify-center p-4'>
                    <Image
                      src={content.image}
                      alt={content.title}
                      width={content.imageWidth}
                      height={content.imageHeight}
                      className='object-contain max-h-full'
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* PC端卡片内容 */}
        <div className='hidden md:block'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className='overflow-hidden h-[500px] md:h-[400px] mt-8 mb-16 bg-[#0F0326]/50 backdrop-blur-sm rounded-lg border border-[#78E7FB]/10'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative'>
              {/* Left Content */}
              <div className='p-4 md:p-12 flex flex-col justify-center overflow-hidden relative'>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={activeDescription}
                    custom={direction}
                    variants={slideVariants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className='absolute inset-0 flex flex-col justify-center'
                  >
                    <div className='max-w-[90%] p-4 md:p-[30px]'>
                      <motion.h3
                        className='text-xl md:text-3xl font-bold text-white mb-4 md:mb-6'
                        variants={textVariants}
                      >
                        {cardContents[activeDescription].title}
                      </motion.h3>
                      <motion.p
                        className='text-gray-400 text-sm md:text-base mb-4'
                        variants={textVariants}
                      >
                        {cardContents[activeDescription].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Content - 3D Visualization */}
              <div className='relative h-[200px] md:h-auto justify-center items-center flex overflow-hidden'>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={activeDescription}
                    custom={direction}
                    variants={slideVariants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className='absolute w-full h-full flex justify-center items-center'
                  >
                    <Image
                      src={cardContents[activeDescription].image}
                      alt={cardContents[activeDescription].title}
                      width={cardContents[activeDescription].imageWidth}
                      height={cardContents[activeDescription].imageHeight}
                      className='object-contain'
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  )
}
