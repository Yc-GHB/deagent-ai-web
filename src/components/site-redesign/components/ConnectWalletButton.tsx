'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

interface ConnectWalletButtonProps {
  readonly ghost?: boolean
  readonly compact?: boolean
  readonly onOpen?: () => void
}

function Brackets() {
  return (
    <span aria-hidden='true' className='corner-brackets corner-brackets--light'>
      <i className='corner-bracket corner-bracket--tl' />
      <i className='corner-bracket corner-bracket--tr' />
      <i className='corner-bracket corner-bracket--bl' />
      <i className='corner-bracket corner-bracket--br' />
    </span>
  )
}

/**
 * 站内 Connect Wallet：打开 RainbowKit 选钱包弹窗；已连接则打开账户弹窗。
 */
export default function ConnectWalletButton({ ghost = false, compact = false, onOpen }: ConnectWalletButtonProps) {
  const { messages } = useI18n()
  const label = messages.nav.cta

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const isReady = mounted
        const isConnected = Boolean(isReady && account && chain)
        const isWrongNetwork = Boolean(isConnected && chain?.unsupported)
        const buttonClass = `editorial-button ${ghost ? 'editorial-button--ghost' : ''}`

        const handleClick = (): void => {
          onOpen?.()
          if (!isConnected) {
            openConnectModal?.()
            return
          }
          if (isWrongNetwork) {
            openChainModal?.()
            return
          }
          openAccountModal?.()
        }

        const buttonLabel = !isConnected
          ? label
          : isWrongNetwork
            ? messages.nav.wrongNetwork
            : account?.displayName ?? label

        return (
          <span className={compact ? undefined : 'editorial-button-wrap'}>
            {!compact && <Brackets />}
            <button
              type='button'
              className={compact ? 'mobile-connect-wallet' : buttonClass}
              disabled={!isReady}
              onClick={handleClick}
            >
              {buttonLabel}
              {!compact && !isConnected && <ArrowRight size={14} />}
            </button>
          </span>
        )
      }}
    </ConnectButton.Custom>
  )
}
