'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Landmark, X } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

type ModalView = 'menu' | 'cex'

interface ExchangeOption {
  readonly id: string
  readonly name: string
  readonly href: string
}

/** CEX 现货入口：Bitget / 抹茶(MEXC) */
const CEX_EXCHANGES: readonly ExchangeOption[] = [
  { id: 'bitget', name: 'Bitget', href: 'https://www.bitget.com/spot/AIAUSDT' },
  { id: 'mexc', name: 'MEXC', href: 'https://www.mexc.com/exchange/AIA_USDT' },
] as const

interface GetAiaModalProps {
  readonly open: boolean
  readonly onClose: () => void
}

/**
 * GET $AIA 弹窗：引导用户通过 Bitget / 抹茶交易。
 */
export default function GetAiaModal({ open, onClose }: GetAiaModalProps) {
  const { messages } = useI18n()
  const copy = messages.nav.getAiaModal
  const [view, setView] = useState<ModalView>('menu')

  useEffect(() => {
    if (!open) {
      setView('menu')
      return undefined
    }
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (view === 'cex') setView('menu')
        else onClose()
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, view])

  if (!open) return null

  return (
    <div className='get-aia-modal' role='presentation'>
      <button type='button' className='get-aia-modal__backdrop' aria-label={copy.closeAria} onClick={onClose} />
      <div className='get-aia-modal__dialog' role='dialog' aria-modal='true' aria-labelledby='get-aia-modal-title'>
        <header className='get-aia-modal__header'>
          {view === 'cex' ? (
            <button type='button' className='get-aia-modal__back' aria-label={copy.backAria} onClick={() => setView('menu')}>
              <ChevronLeft size={16} strokeWidth={1.8} />
            </button>
          ) : null}
          <h2 id='get-aia-modal-title'>{view === 'cex' ? copy.cexTitle : copy.title}</h2>
          <button type='button' className='get-aia-modal__close' aria-label={copy.closeAria} onClick={onClose}>
            <X size={16} strokeWidth={1.8} />
          </button>
        </header>
        {view === 'menu' ? (
          <button type='button' className='get-aia-modal__option' onClick={() => setView('cex')}>
            <span className='get-aia-modal__option-icon' aria-hidden='true'>
              <Landmark size={18} strokeWidth={1.6} />
            </span>
            <span className='get-aia-modal__option-copy'>
              <strong>{copy.cexTitle}</strong>
              <span>{copy.cexDescription}</span>
            </span>
            <ChevronRight className='get-aia-modal__option-chevron' size={16} strokeWidth={1.8} aria-hidden='true' />
          </button>
        ) : (
          <div className='get-aia-modal__exchanges'>
            {CEX_EXCHANGES.map(exchange => (
              <a
                key={exchange.id}
                className='get-aia-modal__option'
                href={exchange.href}
                target='_blank'
                rel='noreferrer'
                onClick={onClose}
              >
                <span className='get-aia-modal__option-copy'>
                  <strong>{exchange.name}</strong>
                  <span>{copy.pairLabel}</span>
                </span>
                <ChevronRight className='get-aia-modal__option-chevron' size={16} strokeWidth={1.8} aria-hidden='true' />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 判断导航项是否应打开 GET $AIA 弹窗。
 */
export function isGetAiaHref(href: string): boolean {
  return href === '#get-aia'
}

export type { GetAiaModalProps }
