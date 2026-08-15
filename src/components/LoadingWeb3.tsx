'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function LoadingWeb3() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-[#0D0620] z-50'>
      <div className='relative flex flex-col items-center'>
        <div className='relative w-[200px] h-[200px]'>
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              top: '50%',
              left: '50%',
              marginLeft: '-40px',
              marginTop: '-40px',
            }}
          >
            <Image
              src='/images/loading.svg'
              alt='Loading'
              width={80}
              height={80}
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
