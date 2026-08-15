'use client'

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

export function IncentiveMechanism() {
  return (
    <section className='w-full px-4 py-12 bg-black'>
      <div className='space-y-12'>
        {/* First Section - Octagon */}
        <div>
          <div className='relative w-full aspect-square mb-6'>
            <Image
              src='/images/mechanism/octagon.png'
              alt='First AI Feedback Mechanism'
              fill
              className='object-contain'
            />
          </div>
          <div>
            <div className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'>
              MISSION
            </div>
            <h2 className='text-2xl font-bold text-white mb-2'>
              The first Web3 AI agent platform powered by feedback mechanism
            </h2>
            <p className='text-[#A1A1A1] text-sm leading-relaxed'>
              DeAgentAI has achieved &ldquo;Proof-of-Insight&rdquo; by tightly coupling feedback with the training process.
            </p>
          </div>
        </div>

        {/* Second Section - Cone */}
        <div>
          <div className='relative w-full aspect-square mb-6'>
            <Image
              src='/images/mechanism/cone.png'
              alt='High-Quality AI-Web3 Synergy'
              fill
              className='object-contain'
            />
          </div>
          <div>
            <div className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'>
              VISION
            </div>
            <h2 className='text-2xl font-bold text-white mb-2'>
              High-Quality
            </h2>
            <h3 className='text-2xl font-bold text-white mb-4'>
              AI-Web3 Synergy
            </h3>
            <p className='text-[#A1A1A1] text-sm leading-relaxed'>
              DeAgentAI&apos;s vision is to revolutionize Web3 by harnessing high-performance AI to solve the industry&apos;s inherent challenges and drive innovation.
            </p>
          </div>
        </div>

        {/* Third Section - All-Round Excellence */}
        <div>
          <div className='inline-block px-4 py-1.5 bg-[#1A1046] rounded-full text-[#00D5DA] text-sm font-medium mb-4'>
            ADVANTAGE
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>
            All-Round Excellence in Product,
          </h2>
          <h3 className='text-2xl font-bold text-white mb-8'>
            Technology, and Team.
          </h3>
        </div>

        {/* Fourth Section - Features Grid */}
        <div className='space-y-8'>
          {features.map((feature, index) => (
            <div key={index} className='space-y-4'>
              <Image
                src={feature.icon}
                alt={feature.title}
                width={48}
                height={48}
              />
              <div>
                <h4 className='text-lg font-bold text-white'>
                  {feature.title}
                </h4>
                {feature.subtitle && (
                  <h5 className='text-lg font-bold text-white mb-2'>
                    {feature.subtitle}
                  </h5>
                )}
                <p className='text-[#A1A1A1] text-sm leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
