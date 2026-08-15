import { FC } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { chains } from '@/config/web3'

export const ChainInfo: FC = () => {
  const chainId = useChainId()
  const { switchChainAsync } = useSwitchChain()

  // 获取当前链的信息
  const currentChain = chains.find(chain => chain.id === chainId)

  // 处理链切换
  const handleSwitchChain = async (targetChainId: number) => {
    try {
      await switchChainAsync({ chainId: targetChainId })
    } catch (error) {
      console.error('Failed to switch chain:', error)
    }
  }

  return (
    <div className='p-4 rounded-lg bg-[#1A1046] text-white'>
      <h3 className='text-lg font-bold mb-4'>Chain Information</h3>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <p>
            <span className='text-[#666666]'>Chain ID:</span>{' '}
            <span className='text-[#00D5DA]'>{chainId}</span>
          </p>
          <p>
            <span className='text-[#666666]'>Chain Name:</span>{' '}
            <span className='text-[#00D5DA]'>{currentChain?.name || 'Unknown Network'}</span>
          </p>
          {currentChain && (
            <>
              <p>
                <span className='text-[#666666]'>Native Currency:</span>{' '}
                <span className='text-[#00D5DA]'>{currentChain.nativeCurrency.symbol}</span>
              </p>
              <p>
                <span className='text-[#666666]'>Explorer:</span>{' '}
                <a
                  href={currentChain.blockExplorers?.default?.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#00D5DA] hover:underline'
                >
                  {currentChain.blockExplorers?.default?.name}
                </a>
              </p>
            </>
          )}
        </div>

        <div className='pt-4 border-t border-white/10'>
          <p className='text-sm text-[#666666] mb-2'>Switch Network:</p>
          <div className='grid grid-cols-2 gap-2'>
            {chains.map(chain => (
              <button
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id)}
                disabled={chain.id === chainId}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors
                  ${chain.id === chainId
                ? 'bg-[#2A2056] text-[#666666] cursor-not-allowed'
                : 'bg-[#2A2056] hover:bg-[#3A3066] text-white'
              }`}
              >
                {chain.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
