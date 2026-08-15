'use client'

import { FC, Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navigation } from '@/config'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
export const Header: FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const updateHeader = () => {
      // 获取视频区域的高度（假设是视口高度）
      const videoHeight = window.innerHeight
      // 当滚动超过视频区域时隐藏header
      setIsVisible(window.scrollY < videoHeight - 64) // 64px是header的高度
    }

    window.addEventListener('scroll', updateHeader)
    updateHeader() // 初始化

    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 right-0 z-50 border-b border-white/10'
    >
      <nav className='mx-auto px-6 h-16 flex items-center justify-between bg-[rgba(0,0,0,0.5)] backdrop-blur-sm'>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href='/' className='flex items-center'>
            <Image
              src='/icons/logo.svg'
              alt='DeAgent AI'
              width={190}
              height={21}
              priority
            />
          </Link>
        </motion.div>

        {/* Navigation */}
        <div className='hidden md:flex items-center space-x-8 bg-black p-[12px] rounded-[8px]'>
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className='relative flex items-center gap-1'
            >
              {item.dropdown ? (
                <DropdownMenu open={openDropdown === item.name} onOpenChange={open => setOpenDropdown(open ? item.name : null)}>
                  <DropdownMenuTrigger
                    className='cursor-pointer text-white/80 hover:text-white transition-colors outline-none'
                  >
                    {item.name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side='top'
                    align='center'
                  >
                    {item.dropdown.map((dropdownItem, idx) => (
                      <Fragment key={dropdownItem.name}>
                        <DropdownMenuItem asChild>
                          <Link
                            href={dropdownItem.href!}
                            target={dropdownItem.target}
                            className='w-full'
                          >
                            {dropdownItem.name}
                          </Link>
                        </DropdownMenuItem>
                        {idx < item.dropdown!.length - 1 && <DropdownMenuSeparator />}
                      </Fragment>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href={item.href!}
                    target={item.target}
                    className='text-white/80 hover:text-white hover:scale-105 transition-all'
                  >
                    {item.name}
                  </Link>
                  {/* {item.name === 'AIRDROP'  && (
                    <Image
                      src='/images/hot.gif'
                      alt='Hot'
                      width={20}
                      height={16}
                      className='ml-1'
                    />
                  )} */}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Connect Button */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ConnectButton label='CONNECT WALLET' />
        </motion.div> */}
        <div className='w-[100px] h-[64px]'></div>
      </nav>
    </motion.header>
  )
}
