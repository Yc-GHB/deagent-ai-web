'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'HOME', href: '/' },
  // { name: 'MINER', href: 'https://dam.deagent.ai/', target: '_blank' },
  { name: 'AI AGENT', href: '/ai-agent' },
  { name: 'EVENT', href: '/event' },
]

const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/DeAgentAI',
    target: '_blank',
    icon: '/images/twitter-logo.svg',
  },
  {
    name: 'Discord',
    href: 'https://discord.com/invite/officialdeagentai',
    target: '_blank',
    icon: '/images/discord-logo.svg',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/officialdeagentai',
    target: '_blank',
    icon: '/images/telegram-logo.svg',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/DeAgentAI',
    target: '_blank',
    icon: '/images/github-mark-white.svg',
  },
]

export const Footer: FC = () => {
  return (
    <footer className='bg-black'>
      <div className='max-w-[1024px] mx-auto px-4 md:px-6 py-8'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          {/* Logo */}
          <div>
            <Image
              src='/images/home/footer.logo.svg'
              alt='DeAgent Logo'
              width={48}
              height={48}
              className='object-contain'
            />
          </div>

          {/* Navigation */}
          <nav className='flex gap-8'>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className='text-white hover:text-[#78E7FB] transition-colors text-sm'
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            {socialLinks.map(item => (
              <a
                key={item.name}
                href={item.href}
                className='hover:opacity-80 transition-opacity'
                target={item.target}
                rel='noopener noreferrer'
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                  className='object-contain'
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-8 text-center text-sm text-gray-400'>
          © {new Date().getFullYear()} DeAgentAI All rights reserved.
        </div>
      </div>
    </footer>
  )
}
