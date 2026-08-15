'use client'

import { FC } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Agent, agents } from '@/data/agents'
import Link from 'next/link'

interface AgentCardProps extends Agent {
  index: number
}

const AgentCard: FC<AgentCardProps> = ({ title, icon, description, status, href, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
      className='h-[280px]'
    >
      <motion.div
        className='bg-[#1A1A1A]/20 backdrop-blur rounded-[16px] overflow-hidden border border-white/10 h-full'
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 30px rgba(0,213,218,0.2)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className='block p-5 h-full flex flex-col'>
          <div className='flex items-start gap-3 mb-3 flex-shrink-0'>
            <motion.div
              className='w-20 h-20 rounded-xl overflow-hidden bg-[#1A1A1A] flex items-center justify-center flex-shrink-0'
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={icon}
                alt={title}
                width={64}
                height={64}
                className='w-full h-full object-contain p-3'
                priority
              />
            </motion.div>
            <div className='flex-1'>
              <motion.h3
                className='text-lg font-bold text-white mb-0.5'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <Link href={href ?? ''} target='_blank'>
                  {title}
                </Link>
              </motion.h3>
              <motion.span
                className='text-xs text-[#00D5DA]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                {status}
              </motion.span>
            </div>
          </div>
          <motion.p
            className='text-sm text-gray-300 leading-relaxed flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const AIAgentPage: FC = () => {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 200], [0.2, 0])

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#2D1B69] to-[#0F051D] relative'>
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/grid-pattern.svg')]"
        style={{
          opacity,
          y: backgroundY,
        }}
      />

      {/* Hero Section */}
      <div className='relative overflow-hidden pt-24 pb-12'>
        {/* Content */}
        <div className='relative z-10 max-w-[1200px] mx-auto px-6'>
          <motion.div
            className='max-w-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.21, 1.11, 0.81, 0.99],
            }}
          >
            <motion.h1
              className='text-3xl font-bold text-[#00D5DA] leading-normal mb-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.21, 1.11, 0.81, 0.99],
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ALPHA-X
              </motion.span>
            </motion.h1>
            <motion.p
              className='text-xl text-white/80'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: [0.21, 1.11, 0.81, 0.99],
              }}
            >
              the FIRST web3 agent under<br />
              the DeAgentAI feedback training mechanism.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-4'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {agents.map((agent, index) => (
              <AgentCard
                key={agent.id}
                {...agent}
                index={index}
              />
            ))}
          </motion.div>
          <div className='text-center text-white/80 text-2xl mt-12'>
            More Agents are COMING...
          </div>
        </div>
      </div>
    </div>
  )
}
