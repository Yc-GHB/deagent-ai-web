'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n/I18nProvider'

const SOCIAL_ICONS: Record<string, string> = {
  'https://discord.com/invite/officialdeagentai': '/figma-assets/discord.svg',
  'https://t.me/officialdeagentai': '/figma-assets/telegram.svg',
  'https://x.com/DeAgentAI': '/figma-assets/x-twitter.svg',
}

/**
 * 全站统一页脚。
 */
export function SiteFooter() {
  const { messages } = useI18n()
  const footer = messages.footer

  return (
    <footer className='site-footer'>
      <div className='footer-main'>
        <div className='footer-brand'>
          <img src='/deagentai-logo.svg' alt={footer.logoAlt} />
          <p>{footer.tagline}</p>
        </div>
        <div className='footer-products'>
          <h3>{footer.products.title}</h3>
          {footer.products.links.map(link => (
            <Link key={`${link.href}-${link.label}`} href={link.href} prefetch>
              {link.label}
              {'badge' in link && link.badge ? (
                <img className='footer-new-badge' src='/images/home/badge-new.svg' alt={link.badge} />
              ) : null}
            </Link>
          ))}
        </div>
        <div className='footer-community'>
          <h3>{footer.community.title}</h3>
          <div>
            {footer.community.social.map(item => (
              <a key={item.href} href={item.href} aria-label={item.label} target='_blank' rel='noreferrer'>
                <img src={SOCIAL_ICONS[item.href] ?? '/figma-assets/x-twitter.svg'} alt='' />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className='copyright'>{footer.copyright}</p>
    </footer>
  )
}
