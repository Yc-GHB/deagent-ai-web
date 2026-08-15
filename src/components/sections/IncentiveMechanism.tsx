'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    icon: '/images/mechanism/multi-agent.svg',
    title: 'Multi-Agent',
    subtitle: 'Reinforcement Learning',
    description: 'Reduce trading risks through collective intelligence and dynamic strategy adjustment.',
  },
  {
    icon: '/images/mechanism/optimized-ai.svg',
    title: 'Optimized AI',
    subtitle: 'Computing',
    description: 'Reduce training computing costs through advanced neural network infrastructure and distributed computing technology.',
  },
  {
    icon: '/images/mechanism/modular-agent.svg',
    title: 'Modular Agent',
    subtitle: 'Architecture',
    description: 'Supports developing and integrating diverse AI agents tailored to specific tasks and industries.',
  },
  {
    icon: '/images/mechanism/llm.svg',
    title: 'Integrate Advanced',
    subtitle: 'Large Language Model',
    description: 'Making price predictions more accurate.',
  },
  {
    icon: '/images/mechanism/smart-tool.svg',
    title: 'Smart Tool Management',
    subtitle: '(QKV Index Network)',
    description: 'Intelligently select and manage tools based on user needs and market conditions to simplify complex trading strategies.',
  },
  {
    icon: '/images/mechanism/proof.svg',
    title: 'Proof-of-Insight',
    description: 'Improve user engagement by incentivizing contributions enhancing AI models to foster a collaborative ecosystem.',
  },
]

export const IncentiveMechanism: FC = () => {
  return (
    <section className='bg-black py-24 w-full'>
      <div className='max-w-[960px] mx-auto px-8'>
        {/* First Section - Octagon */}
        <div className='mb-32'>
          <div className='grid grid-cols-2 gap-8 items-center'>
            <div>
              <motion.div
                className='w-full aspect-square'
                initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src='/images/mechanism/octagon.png'
                  alt='First AI Feedback Mechanism'
                  width={400}
                  height={400}
                  className='w-full h-full object-contain'
                />
              </motion.div>
            </div>

            <div>
              <motion.div
                className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                MISSION
              </motion.div>
              <motion.h2
                className='text-4xl font-bold text-white mb-4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                The first Web3 AI agent platform powered by feedback mechanism
              </motion.h2>
              <motion.p
                className='text-[#A1A1A1] text-lg leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                DeAgentAI has achieved &ldquo;Proof-of-Insight&rdquo; by tightly coupling feedback with the training process.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Second Section - Cone */}
        <div className='mb-32'>
          <div className='grid grid-cols-2 gap-8 items-center'>
            <div>
              <motion.div
                className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                VISION
              </motion.div>
              <motion.h2
                className='text-4xl font-bold text-white mb-4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                High-Quality
              </motion.h2>
              <motion.h3
                className='text-4xl font-bold text-white mb-6'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                AI-Web3 Synergy
              </motion.h3>
              <motion.p
                className='text-[#A1A1A1] text-lg leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                DeAgentAI&apos;s vision is to revolutionize Web3 by harnessing high-performance AI to solve the industry&apos;s inherent challenges and drive innovation.
              </motion.p>
            </div>

            <motion.div
              className='w-full aspect-square'
              initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src='/images/mechanism/cone.png'
                alt='High-Quality AI-Web3 Synergy'
                width={400}
                height={400}
                className='w-full h-full object-contain'
              />
            </motion.div>
          </div>
        </div>

        {/* Third Section - All-Round Excellence */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'>
            ADVANTAGE
          </div>
          <h2 className='text-4xl font-bold text-white mb-4'>
            All-Round Excellence in Product,
          </h2>
          <h3 className='text-4xl font-bold text-white mb-16'>
            Technology, and Team.
          </h3>
        </motion.div>

        {/* Fourth Section - Features Grid */}
        <div className='grid grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='flex flex-col items-start'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={48}
                height={48}
                className='mb-4'
              />
              <h4 className='text-xl font-bold text-white mb-2'>
                {feature.title}
              </h4>
              {feature.subtitle && (
                <h5 className='text-xl font-bold text-white mb-4'>
                  {feature.subtitle}
                </h5>
              )}
              <p className='text-[#A1A1A1] text-sm leading-relaxed'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
