'use client'

import { motion } from 'framer-motion'

const features = [
  {
    name: 'Multi-Agent Reinforcement Learning',
    description: 'Reduce trading risks through collective intelligence and dynamic strategy adjustment.',
    icon: '/icons/features/multi-agent.svg',
  },
  {
    name: 'Optimized AI Computing',
    description: 'Reduce training computing costs through advanced neural network infrastructure and distributed computing technology.',
    icon: '/icons/features/computing.svg',
  },
  {
    name: 'Modular Agent Architecture',
    description: 'Supports developing and integrating diverse AI agents tailored to specific tasks and industries.',
    icon: '/icons/features/architecture.svg',
  },
  {
    name: 'Integrate Advanced Large Language Model',
    description: 'Making price predictions more accurate.',
    icon: '/icons/features/llm.svg',
  },
  {
    name: 'Smart Tool Management (QKV Index Network)',
    description: 'Intelligently select and manage tools based on user needs and market conditions to simplify complex trading strategies.',
    icon: '/icons/features/tool.svg',
  },
  {
    name: 'Proof-of-Insight',
    description: 'Improve user engagement by incentivizing contributions enhancing AI models in factor α collaborative ecosystem.',
    icon: '/icons/features/proof.svg',
  },
]

export function Features() {
  return (
    <div className='bg-black py-24'>
      <div className='max-w-[1440px] mx-auto px-16'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'>
            ADVANTAGE
          </div>
          <h2 className='text-3xl font-bold text-white mb-4'>
            All-Round Excellence in Product,<br />Technology, and Team.
          </h2>
        </motion.div>

        <div className='grid grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className='bg-[#1A1046] rounded-2xl p-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='h-12 w-12 mb-6 relative'>
                <div className='w-full h-full bg-white/10 rounded flex items-center justify-center text-white/30 text-xs'>
                  Icon
                </div>
              </div>
              <h3 className='text-xl font-semibold text-white mb-4'>
                {feature.name}
              </h3>
              <p className='text-[#A1A1A1] text-sm leading-relaxed'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
