'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { navigation } from '@/config'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  useEffect(() => {
    const updateHeader = () => {
      // 获取视频区域的高度（假设是视口高度）
      const videoHeight = window.innerHeight
      // 当滚动超过视频区域时隐藏header
      setIsVisible(window.scrollY < videoHeight - 50) // 50px是header的高度
    }

    window.addEventListener('scroll', updateHeader)
    updateHeader() // 初始化

    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <>
      <motion.header
        className='fixed top-0 left-0 right-0 z-[100] border-b border-white/10'
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className='px-4 py-3 flex justify-between items-center'>
          {/* Logo */}
          <Link href='/' className='relative z-[100] flex items-center'>
            <div className='relative w-[140px] h-[24px]'>
              <Image
                src='/icons/logo.svg'
                alt='DeAgent Logo'
                width={140}
                height={24}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>

          {/* Hamburger Menu */}
          <button
            className='relative z-[100] w-8 h-8 flex flex-col justify-center items-center gap-1.5'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            <motion.span
              className='w-6 h-0.5 bg-white'
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className='w-6 h-0.5 bg-white'
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className='w-6 h-0.5 bg-white'
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className='fixed inset-0 z-[90] bg-[#0D0620]/95 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='pt-20 px-4'>
              <nav className='flex flex-col items-center'>
                <ul className='flex flex-col items-center gap-10'>
                  {navigation.map(item => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1 }}
                      className='flex flex-col items-center gap-2'
                    >
                      {item.dropdown ? (
                        <div className='flex flex-col items-center gap-4'>
                          <button
                            className='text-[32px] font-medium text-white hover:text-[#00D5DA] transition-colors'
                            onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                          >
                            {item.name}
                          </button>
                          <AnimatePresence>
                            {expandedMenu === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className='flex flex-col items-center gap-3'
                              >
                                {item.dropdown.map(dropdownItem => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href!}
                                    target={dropdownItem.target}
                                    className='text-[24px] font-medium text-white/80 hover:text-[#00D5DA] transition-colors'
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className='flex items-center gap-2'>
                          <Link
                            href={item.href!}
                            target={item.target}
                            className='text-[32px] font-medium text-white hover:text-[#00D5DA] transition-colors'
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                          {/* {item.name === 'AIRDROP' && (
                            <Image
                              src='/images/hot.gif'
                              alt='Hot'
                              width={24}
                              height={19}
                            />
                          )} */}
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
