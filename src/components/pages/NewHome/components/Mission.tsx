'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

// 添加fadeIn动画变量
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

// 阴影效果
const shadowVariants = {
  rest: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

// 卡片宽度变化效果
const expandCardVariants = {
  expanded: {
    width: '66.666%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  shrunk: {
    width: '33.333%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

// 图标容器效果
const iconContainerVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

export default function Mission() {
  const [activeCards, setActiveCards] = useState<{[key: number]: string | null}>({
    1: 'verifiable', // 第一行激活的卡片ID - 第二个卡片
    2: 'persistent', // 第二行激活的卡片ID - 第一个卡片
    3: 'scalable',  // 第三行激活的卡片ID - 第二个卡片
  })

  // 跟踪鼠标悬停的卡片
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // 定义所有卡片数据
  const cards = [
    {
      id: 'decentralized',
      title: 'Decentralized',
      subtitle: 'AI Governance',
      description: 'DeAgentAI introduces DeAgent, a distributed decision-making framework that ensures AI Agents operate with consensus, identity, and continuity, fostering trust in autonomous AI governance.',
      icon: '/images/home/img-1.png',
      row: 1,
      position: 'left',
      defaultWidth: 'md:w-1/3', // 1:2 比例中的 1
    },
    {
      id: 'verifiable',
      title: 'Verifiable &',
      subtitle: 'Transparent Execution',
      description: 'The Executor & Committer mechanism guarantees that AI-driven decisions are executed transparently and verified on-chain, preventing manipulation and ensuring accountability.',
      icon: '/images/home/img-2.png',
      row: 1,
      position: 'right',
      defaultWidth: 'md:w-2/3', // 1:2 比例中的 2
    },
    {
      id: 'persistent',
      title: 'Persistent',
      subtitle: 'AI Memory',
      description: 'With Memory Modules, DeAgentAI empowers AI Agents with long-term recall and contextual awareness, ensuring decisions are informed by historical interactions.',
      icon: '/images/home/img-3.png',
      row: 2,
      position: 'left',
      defaultWidth: 'md:w-2/3', // 2:1 比例中的 2
    },
    {
      id: 'ai-powered',
      title: 'AI-Powered DAOs &',
      subtitle: 'Collaboration',
      description: 'DeAgentAI enables AI Agents to participate in Decentralized Autonomous Organizations (DAOs), allowing AI and humans to co-govern and make collective decisions in a decentralized environment.',
      icon: '/images/home/img-4.png',
      row: 2,
      position: 'right',
      defaultWidth: 'md:w-1/3', // 2:1 比例中的 1
    },
    {
      id: 'interoperable',
      title: 'Interoperable &',
      subtitle: 'Modular Design',
      description: 'DeAgentAI supports seamless integration with smart contracts, DeFi protocols, and other Web3 infrastructures, making it highly adaptable to diverse decentralized applications.',
      icon: '/images/home/img-5.png',
      row: 3,
      position: 'left',
      defaultWidth: 'md:w-1/3', // 1:2 比例中的 1
    },
    {
      id: 'scalable',
      title: 'Scalable &',
      subtitle: 'Autonomous AI Economy',
      description: 'By leveraging decentralized execution and AI-driven automation, DeAgentAI fosters a scalable AI economy, where intelligent agents perform autonomous tasks with minimal human intervention.',
      icon: '/images/home/img-6.png',
      row: 3,
      position: 'right',
      defaultWidth: 'md:w-2/3', // 1:2 比例中的 2
    },
  ]

  // 处理卡片悬停
  const handleCardHover = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (!card) {return}

    // 设置激活的卡片
    setActiveCards(prev => ({
      ...prev,
      [card.row]: cardId,
    }))

    // 设置悬停的卡片
    setHoveredCard(cardId)
  }

  // 处理卡片悬停结束
  const handleCardHoverEnd = () => {
    setHoveredCard(null)
  }

  // 获取卡片的宽度类
  const getCardWidthClass = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (!card) {return ''}

    const rowActiveCard = activeCards[card.row]

    // 如果该行没有激活的卡片，使用默认宽度
    if (!rowActiveCard) {
      return card.defaultWidth
    }

    // 如果当前卡片是激活的卡片，占据2/3宽度
    if (rowActiveCard === cardId) {
      return 'md:w-2/3'
    }

    // 否则占据1/3宽度
    return 'md:w-1/3'
  }

  // 检查卡片是否激活
  const isCardActive = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (!card) {return false}

    return activeCards[card.row] === cardId
  }

  // 获取图标显示状态
  const getIconVisibility = (cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (!card) {return 'hidden'}

    // 只有当前卡片是激活的卡片时，才显示图标
    return isCardActive(cardId) ? 'visible' : 'hidden'
  }

  return (
    <div className='mx-[12px] overflow-hidden'>
      <section className='py-16 md:py-24 relative bg-gradient-to-b from-[rgb(51,0,157)] to-[#000] rounded-t-2xl overflow-hidden'>
        {/* 背景渐变色 */}
        <div className='absolute inset-x-0 top-0 bg-gradient-to-b from-[rgb(51,0,157)] to-[#000] z-0'></div>

        <div className='max-w-[1024px] mx-auto px-4 md:px-6 relative z-10'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className='text-center mb-12 md:mb-16'
          >
            <h2 className='text-[24px] mb-4 max-w-[500px] mx-auto text-white'>
              Largest AI Agent infra on SUI/BSC/BTC
            </h2>
            <p className='text-sm md:text-base mb-4'>
            DeAgentAI empowers AI Agents to think, agree, and remember—just like humans, but better.
            </p>
          </motion.div>

          {/* 卡片行 */}
          <div className='space-y-2 md:space-y-2'>
            {/* 移动端流水式布局 */}
            <div className='block md:hidden space-y-2'>
              {cards.map(card => (
                <motion.div
                  key={card.id}
                  className='relative border rounded-[8px] overflow-hidden w-full'
                  style={{
                    borderColor: '#3d3d3d',
                    minHeight: '200px',
                  }}
                >
                  <div className='flex flex-col'>
                    {/* 图片区域 */}
                    <div className='relative w-full h-[200px] flex items-center justify-center p-4'>
                      <Image
                        src={card.icon}
                        fill
                        alt={`${card.title} Icon`}
                        className='object-contain'
                      />
                    </div>
                    {/* 文字区域 */}
                    <div className='p-4 overflow-y-auto scrollbar-hide'>
                      <h3 className='text-[20px] font-semibold'>{card.title}</h3>
                      <h4 className='text-[20px] font-medium mb-2'>{card.subtitle}</h4>
                      <p className='text-xs leading-relaxed'>{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PC端保持原有布局 */}
            <div className='hidden md:block'>
              {/* 第一行 */}
              <div className='flex flex-row gap-2'>
                {cards.filter(card => card.row === 1).map(card => (
                  <motion.div
                    key={card.id}
                    className={`relative border rounded-[8px] p-4 md:p-8 overflow-hidden w-full transition-all duration-500 ease-in-out ${getCardWidthClass(card.id)}`}
                    onMouseEnter={() => handleCardHover(card.id)}
                    onMouseLeave={handleCardHoverEnd}
                    style={{
                      height: '280px',
                      borderColor: hoveredCard === card.id ? 'rgba(120, 231, 251, 0.5)' : '#3d3d3d',
                      boxShadow: hoveredCard === card.id
                        ? '0 0 20px rgba(120, 231, 251, 0.3), 0 0 40px rgba(120, 231, 251, 0.1)'
                        : 'none',
                    }}
                    variants={expandCardVariants}
                    animate={activeCards[card.row] === card.id ? 'expanded' : 'shrunk'}
                  >
                    {/* 悬停阴影效果 */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-[#78E7FB20] to-transparent rounded-[8px]'
                      variants={shadowVariants}
                      animate={activeCards[card.row] === card.id ? 'hover' : 'rest'}
                    />

                    {/* 内发光效果 - 只在鼠标悬停时显示 */}
                    <motion.div
                      className='absolute inset-0 rounded-[8px] pointer-events-none'
                      initial={{ boxShadow: '0 0 0 rgba(120, 231, 251, 0)' }}
                      animate={{
                        boxShadow: hoveredCard === card.id
                          ? 'inset 0 0 30px rgba(120, 231, 251, 0.3), 0 0 20px rgba(120, 231, 251, 0.2)'
                          : '0 0 0 rgba(120, 231, 251, 0)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />

                    {/* 文字内容 - 固定宽度 */}
                    <div className='relative z-10 h-full' style={{ maxWidth: isCardActive(card.id) ? '50%' : '100%' }}>
                      <div className='w-full'>
                        <h3 className='text-[20px] md:text-[24px] w-full md:w-[270px]'>{card.title}</h3>
                        <h4 className='text-[20px] md:text-[24px] mb-2 md:mb-4 w-full md:w-[270px]'>{card.subtitle}</h4>
                        <p className='text-xs md:text-sm leading-relaxed w-full md:w-[270px]'>{card.description}</p>
                      </div>
                    </div>

                    {/* 图标 - 绝对定位 */}
                    <motion.div
                      className='absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-10'
                      variants={iconContainerVariants}
                      animate={getIconVisibility(card.id)}
                    >
                      <div className='relative w-32 h-32 md:w-48 md:h-48'>
                        <Image
                          src={card.icon}
                          alt={`${card.title} Icon`}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* 第二行 */}
              <div className='flex flex-row gap-2 mt-2'>
                {cards.filter(card => card.row === 2).map(card => (
                  <motion.div
                    key={card.id}
                    className={`relative border rounded-[8px] p-4 md:p-8 overflow-hidden w-full transition-all duration-500 ease-in-out ${getCardWidthClass(card.id)}`}
                    onMouseEnter={() => handleCardHover(card.id)}
                    onMouseLeave={handleCardHoverEnd}
                    style={{
                      height: '280px',
                      borderColor: hoveredCard === card.id ? 'rgba(120, 231, 251, 0.5)' : '#3d3d3d',
                      boxShadow: hoveredCard === card.id
                        ? '0 0 20px rgba(120, 231, 251, 0.3), 0 0 40px rgba(120, 231, 251, 0.1)'
                        : 'none',
                    }}
                    variants={expandCardVariants}
                    animate={activeCards[card.row] === card.id ? 'expanded' : 'shrunk'}
                  >
                    {/* 悬停阴影效果 */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-[#78E7FB20] to-transparent rounded-[8px]'
                      variants={shadowVariants}
                      animate={activeCards[card.row] === card.id ? 'hover' : 'rest'}
                    />

                    {/* 内发光效果 - 只在鼠标悬停时显示 */}
                    <motion.div
                      className='absolute inset-0 rounded-[8px] pointer-events-none'
                      initial={{ boxShadow: '0 0 0 rgba(120, 231, 251, 0)' }}
                      animate={{
                        boxShadow: hoveredCard === card.id
                          ? 'inset 0 0 30px rgba(120, 231, 251, 0.3), 0 0 20px rgba(120, 231, 251, 0.2)'
                          : '0 0 0 rgba(120, 231, 251, 0)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />

                    {/* 文字内容 - 固定宽度 */}
                    <div className='relative z-10 h-full' style={{ maxWidth: isCardActive(card.id) ? '50%' : '100%' }}>
                      <div className='w-full'>
                        <h3 className='text-[20px] md:text-[24px] w-full md:w-[270px]'>{card.title}</h3>
                        <h4 className='text-[20px] md:text-[24px] mb-2 md:mb-4 w-full md:w-[270px]'>{card.subtitle}</h4>
                        <p className='text-xs md:text-sm leading-relaxed w-full md:w-[270px]'>{card.description}</p>
                      </div>
                    </div>

                    {/* 图标 - 绝对定位 */}
                    <motion.div
                      className='absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-10'
                      variants={iconContainerVariants}
                      animate={getIconVisibility(card.id)}
                    >
                      <div className='relative w-32 h-32 md:w-48 md:h-48'>
                        <Image
                          src={card.icon}
                          alt={`${card.title} Icon`}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* 第三行 */}
              <div className='flex flex-row gap-2 mt-2'>
                {cards.filter(card => card.row === 3).map(card => (
                  <motion.div
                    key={card.id}
                    className={`relative border rounded-[8px] p-4 md:p-8 overflow-hidden w-full transition-all duration-500 ease-in-out ${getCardWidthClass(card.id)}`}
                    onMouseEnter={() => handleCardHover(card.id)}
                    onMouseLeave={handleCardHoverEnd}
                    style={{
                      height: '280px',
                      borderColor: hoveredCard === card.id ? 'rgba(120, 231, 251, 0.5)' : '#3d3d3d',
                      boxShadow: hoveredCard === card.id
                        ? '0 0 20px rgba(120, 231, 251, 0.3), 0 0 40px rgba(120, 231, 251, 0.1)'
                        : 'none',
                    }}
                    variants={expandCardVariants}
                    animate={activeCards[card.row] === card.id ? 'expanded' : 'shrunk'}
                  >
                    {/* 悬停阴影效果 */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-[#78E7FB20] to-transparent rounded-[8px]'
                      variants={shadowVariants}
                      animate={activeCards[card.row] === card.id ? 'hover' : 'rest'}
                    />

                    {/* 内发光效果 - 只在鼠标悬停时显示 */}
                    <motion.div
                      className='absolute inset-0 rounded-[8px] pointer-events-none'
                      initial={{ boxShadow: '0 0 0 rgba(120, 231, 251, 0)' }}
                      animate={{
                        boxShadow: hoveredCard === card.id
                          ? 'inset 0 0 30px rgba(120, 231, 251, 0.3), 0 0 20px rgba(120, 231, 251, 0.2)'
                          : '0 0 0 rgba(120, 231, 251, 0)',
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />

                    {/* 文字内容 - 固定宽度 */}
                    <div className='relative z-10 h-full' style={{ maxWidth: isCardActive(card.id) ? '50%' : '100%' }}>
                      <div className='w-full'>
                        <h3 className='text-[20px] md:text-[24px] w-full md:w-[270px]'>{card.title}</h3>
                        <h4 className='text-[20px] md:text-[24px] mb-2 md:mb-4 w-full md:w-[270px]'>{card.subtitle}</h4>
                        <p className='text-xs md:text-sm leading-relaxed w-full md:w-[270px]'>{card.description}</p>
                      </div>
                    </div>

                    {/* 图标 - 绝对定位 */}
                    <motion.div
                      className='absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-10'
                      variants={iconContainerVariants}
                      animate={getIconVisibility(card.id)}
                    >
                      <div className='relative w-32 h-32 md:w-48 md:h-48'>
                        <Image
                          src={card.icon}
                          alt={`${card.title} Icon`}
                          fill
                          className='object-contain'
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
