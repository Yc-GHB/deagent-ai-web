'use client'

import { motion } from 'framer-motion'

export function CTA() {
  return (
    <div className='w-full py-24 bg-[url("/images/proff-bg.svg")] bg-cover bg-center' >
      <div className='mx-auto max-w-[1440px] px-16'>
        <div className='text-center'>
          <motion.h2
            className='text-4xl tracking-tight text-black mb-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let&apos;s embrace<br />
            the AI agent era!
          </motion.h2>
          <div className='flex justify-center gap-6'>
            <motion.a
              href='/ai-agent'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              AI Agent
            </motion.a>
            <motion.a
              href='https://event.deagent.ai/reward'
              target='_blank'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 transition-colors'
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              EVENTS
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}
