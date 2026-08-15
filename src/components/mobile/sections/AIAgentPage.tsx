'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Agent, agents } from '@/data/agents'
import Link from 'next/link'
const AgentCard: FC<Agent> = ({ title, icon, description, status, href }) => {
  return (
    <div className='bg-gray-900 rounded-lg p-4 mb-4'>
      <div className='flex items-center mb-4'>
        <div className='relative w-12 h-12 mr-4'>
          <Image
            src={icon}
            alt={title}
            fill
            className='object-contain'
          />
        </div>
        <div>
          <Link href={href ?? ''} target='_blank'>
            <h3 className='text-xl font-bold text-white'>{title}</h3>
          </Link>
          <span className='text-sm text-[#00D5DA]'>{status}</span>
        </div>
      </div>
      <p className='text-gray-300 text-sm'>{description}</p>
    </div>
  )
}

export const AIAgentPage: FC = () => {
  return (
    <div className='min-h-screen bg-black px-4 py-12'>
      <h1 className='text-3xl font-bold text-[#00D5DA] text-center mb-4'>
        ALPHA-X
      </h1>
      <p className='text-lg text-white/80 text-center mb-8'>
        the FIRST web3 agent under<br />
        the DeAgentAI feedback training mechanism.
      </p>
      <div className='max-w-lg mx-auto'>
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            {...agent}
          />
        ))}
      </div>
      <div className='text-center text-white/80 text-xl mt-8'>
        More Agents are COMING...
      </div>
    </div>
  )
}
