'use client'

import { Web3Provider } from '../providers/Web3Provider'
import SiteNavigation from '@/components/site-redesign/components/SiteNavigation'
import { SiteFooter } from '@/components/site-redesign/components/SiteFooter'
import { I18nProvider } from '@/i18n/I18nProvider'
import '@/components/site-redesign/styles/site.css'

/**
 * 全局客户端布局：统一导航与页脚，并提供站内多语言。
 */
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <I18nProvider>
        <SiteNavigation />
        <div className='site-main'>{children}</div>
        <SiteFooter />
      </I18nProvider>
    </Web3Provider>
  )
}
