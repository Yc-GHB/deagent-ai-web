'use client'

import { FC } from 'react'

export const CTA: FC = () => {
  return (
    <section className="w-full px-4 py-12 bg-[url('/images/proff-bg.svg')] bg-cover bg-center">
      <div className='flex flex-col items-center text-center'>
        <h2 className='text-3xl font-bold text-black mb-8'>
          Let&apos;s embrace<br />
          the AI agent era!
        </h2>
        <div className='flex flex-col gap-4 w-full'>
          <a
            href='/ai-agent'
            className='px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors w-full text-center'
          >
            AI Agent
          </a>
          <a
            href='https://event.deagent.ai/reward'
            target='_blank'
            className='px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors w-full text-center'
          >
            EVENTS
          </a>
        </div>
      </div>
    </section>
  )
}
