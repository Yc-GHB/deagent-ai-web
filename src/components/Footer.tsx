import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/DeAgentAI',
    target: '_blank',
    icon: '/icons/x.svg',
  },
  {
    name: 'Discord',
    href: 'https://discord.com/invite/officialdeagentai',
    target: '_blank',
    icon: '/icons/discord.svg',
  },
]

export const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className='bg-black'
    >
      <div className='max-w-[1440px] mx-auto px-16 py-8'>
        <div className='flex items-center justify-between'>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href='/' className='block'>
              <Image
                src='/icons/logo.svg'
                alt='DeAgent AI'
                width={135}
                height={32}
                priority
                className='h-8 w-auto'
              />
            </Link>
          </motion.div>
          <div className='flex items-center gap-8'>
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className='text-white hover:opacity-80 transition-opacity'
                target={item.target}
                rel='noopener noreferrer'
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                  className='w-6 h-6'
                />
              </motion.a>
            ))}
          </div>
        </div>
        <motion.div
          className='mt-8 text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className='text-sm text-[#666666]'>
            © {new Date().getFullYear()} DeAgentAI All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
