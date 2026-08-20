'use client'

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, ChevronDown, Globe, Menu, X } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'
import { LOCALE_META, type Locale } from '@/i18n/locales'
import GetAiaModal, { isGetAiaHref } from './GetAiaModal'
import ConnectWalletButton from './ConnectWalletButton'

function getActiveNavId(pathname: string, hash: string): string {
  const path = pathname.toLowerCase().replace(/\/$/, '') || '/'
  if (path === '/agents' || path === '/ai-agent' || path === '/alphax' || path === '/token-hub') return 'PRODUCT'
  if (path === '/solutions' || path === '/products' || path === '/case-studies' || path === '/integrations') return 'ECOSYSTEM'
  if (path === '/community' || path === '/event') return 'LEARN'
  if (path === '/buyback') return '$AIA'
  switch (hash) {
    case '#product': return 'PRODUCT'
    case '#ecosystem': return 'ECOSYSTEM'
    case '#partners': return '$AIA'
    case '#learn': return 'LEARN'
    default: return 'HOME'
  }
}

function isExternalHref(href: string, external?: boolean): boolean {
  return Boolean(external) || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')
}

type SiteLinkProps = {
  href: string
  className?: string
  external?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  children: ReactNode
  'aria-label'?: string
  'aria-current'?: 'page' | undefined
  role?: string
}

/**
 * 站内用 Next Link 做客户端跳转，外链用原生 a。
 */
function SiteLink({ href, className, external, onClick, children, ...rest }: SiteLinkProps) {
  if (isExternalHref(href, external)) {
    return (
      <a href={href} className={className} onClick={onClick} target='_blank' rel='noreferrer' {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} onClick={onClick} prefetch {...rest}>
      {children}
    </Link>
  )
}

type FlyoutColumn = {
  title: string
  items: ReadonlyArray<{ title: string; description?: string; href: string; external?: boolean }>
}

function NavigationFlyout({
  columns,
  onNavigate,
  onOpenGetAia,
}: {
  columns: readonly FlyoutColumn[]
  onNavigate: () => void
  onOpenGetAia: () => void
}) {
  return (
    <div className={`nav-flyout ${columns.length > 1 ? 'nav-flyout--wide' : ''}`} role='menu'>
      {columns.map(column => (
        <section key={column.title} className='nav-flyout-group'>
          <h3>{column.title}</h3>
          {column.items.map(item => (
            <SiteLink
              key={item.title + item.href}
              href={item.href}
              external={item.external}
              role='menuitem'
              className='nav-flyout-link'
              onClick={(event) => {
                if (isGetAiaHref(item.href)) {
                  event.preventDefault()
                  onOpenGetAia()
                }
                onNavigate()
              }}
            >
              <strong>
                {item.title}
                {item.external && <ArrowUpRight size={15} strokeWidth={1.5} />}
              </strong>
            </SiteLink>
          ))}
        </section>
      ))}
    </div>
  )
}

/**
 * 语言切换下拉（移动端同样点击展开，菜单走文档流避免被裁切）。
 */
function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, messages } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = LOCALE_META.find(item => item.code === locale) ?? LOCALE_META[0]

  useEffect(() => {
    if (!isOpen) return undefined
    const onPointerDown = (event: PointerEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const selectLocale = (next: Locale): void => {
    setLocale(next)
    setIsOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={`language-switcher ${compact ? 'language-switcher--compact' : ''} ${isOpen ? 'language-switcher--open' : ''}`}
    >
      <button
        type='button'
        className='language-selector'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(open => !open)}
      >
        <Globe size={16} strokeWidth={1.6} />
        <span>{messages.nav.languageShort || current.short}</span>
        <ChevronDown size={10} />
      </button>
      {isOpen && (
        <ul className='language-menu' role='listbox' aria-label='Language'>
          {LOCALE_META.map(item => (
            <li key={item.code}>
              <button
                type='button'
                role='option'
                aria-selected={item.code === locale}
                className={item.code === locale ? 'language-menu__item language-menu__item--active' : 'language-menu__item'}
                onClick={() => selectLocale(item.code)}
              >
                <span>{item.short}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SiteNavigation() {
  const pathname = usePathname()
  const { messages } = useI18n()
  const nav = messages.nav
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNavMenu, setActiveNavMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [headerSolid, setHeaderSolid] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('HOME')
  const [isGetAiaOpen, setIsGetAiaOpen] = useState(false)

  useEffect(() => {
    const syncActiveItem = () => {
      setActiveNavItem(getActiveNavId(pathname, window.location.hash))
    }
    syncActiveItem()
    window.addEventListener('hashchange', syncActiveItem)
    return () => window.removeEventListener('hashchange', syncActiveItem)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
    setActiveNavMenu(null)
    setMobileSection(null)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    const updateHeader = () => setHeaderSolid(window.scrollY >= window.innerHeight - 100)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [pathname])

  const closeMobileMenu = (): void => {
    setMenuOpen(false)
    setMobileSection(null)
  }

  const openGetAiaModal = (): void => {
    setIsGetAiaOpen(true)
    setActiveNavMenu(null)
    closeMobileMenu()
  }

  const handleMobileLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
    if (isGetAiaHref(href)) {
      event.preventDefault()
      openGetAiaModal()
      return
    }
    closeMobileMenu()
  }

  return (
    <>
      <header className={`site-header ${(headerSolid || activeNavMenu || menuOpen) ? 'site-header--solid' : ''}`}>
        <div className='site-nav'>
          <SiteLink href='/' aria-label={nav.aria.home} onClick={closeMobileMenu}>
            <img src='/deagentai-logo.svg' alt={nav.aria.logoAlt} />
          </SiteLink>
          <nav className='desktop-nav' aria-label={nav.aria.primary}>
            {nav.items.map(item => {
              const flyout = nav.flyouts[item.id as keyof typeof nav.flyouts]
              if (!flyout) {
                return (
                  <SiteLink
                    key={item.id}
                    href={item.href}
                    className={activeNavItem === item.id ? 'nav-link--active' : ''}
                    aria-current={activeNavItem === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </SiteLink>
                )
              }
              const isOpen = activeNavMenu === item.id
              return (
                <div
                  key={item.id}
                  className={`nav-menu-item ${isOpen ? 'nav-menu-item--open' : ''} ${activeNavItem === item.id ? 'nav-menu-item--active' : ''}`}
                  onPointerEnter={() => setActiveNavMenu(item.id)}
                  onPointerLeave={() => setActiveNavMenu(null)}
                >
                  <button
                    type='button'
                    className='nav-trigger'
                    aria-expanded={isOpen}
                    onClick={() => setActiveNavMenu(isOpen ? null : item.id)}
                    onFocus={() => setActiveNavMenu(item.id)}
                  >
                    {item.label}
                    <ChevronDown className='nav-trigger-icon' size={12} strokeWidth={1.5} />
                  </button>
                  {isOpen && (
                    <NavigationFlyout
                      columns={flyout.columns}
                      onNavigate={() => setActiveNavMenu(null)}
                      onOpenGetAia={openGetAiaModal}
                    />
                  )}
                </div>
              )
            })}
          </nav>
          <div className='nav-actions'>
            <LanguageSwitcher />
            <ConnectWalletButton />
          </div>
          <button
            type='button'
            className='mobile-menu-toggle'
            aria-label={nav.aria.toggle}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <nav className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} aria-label={nav.aria.primary} aria-hidden={!menuOpen}>
          {nav.items.map(item => {
            const flyout = nav.flyouts[item.id as keyof typeof nav.flyouts]
            if (!flyout) {
              return (
                <SiteLink
                  key={item.id}
                  href={item.href}
                  className={activeNavItem === item.id ? 'nav-link--active' : ''}
                  aria-current={activeNavItem === item.id ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </SiteLink>
              )
            }
            const isExpanded = mobileSection === item.id
            const childLinks = flyout.columns.flatMap(column => column.items)
            return (
              <div
                key={item.id}
                className={`mobile-nav-section ${isExpanded ? 'mobile-nav-section--open' : ''} ${activeNavItem === item.id ? 'mobile-nav-section--active' : ''}`}
              >
                <button
                  type='button'
                  className='mobile-nav-trigger'
                  aria-expanded={isExpanded}
                  onClick={() => setMobileSection(isExpanded ? null : item.id)}
                >
                  <span>{item.label}</span>
                  <ChevronDown className='nav-trigger-icon' size={14} strokeWidth={1.5} />
                </button>
                {isExpanded && (
                  <div className='mobile-nav-links'>
                    {childLinks.map(link => (
                      <SiteLink
                        key={link.title + link.href}
                        href={link.href}
                        external={link.external}
                        className='mobile-nav-link'
                        onClick={event => handleMobileLinkClick(event, link.href)}
                      >
                        <span>{link.title}</span>
                        {link.external && <ArrowUpRight size={14} strokeWidth={1.5} />}
                      </SiteLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <LanguageSwitcher compact />
          <ConnectWalletButton compact onOpen={closeMobileMenu} />
        </nav>
      </header>
      <GetAiaModal open={isGetAiaOpen} onClose={() => setIsGetAiaOpen(false)} />
    </>
  )
}
