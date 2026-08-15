import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { bsc } from 'wagmi/chains'
import { type Chain } from 'wagmi/chains'

const WEB3_APP_CONFIG = {
  projectId: 'be81b1f73b7c7618c87bbda75004c0a7',
  appName: 'DeAgent AI',
  appUrl: 'https://deagent.ai',
  appLogo: '/icons/logo.svg',
} as const

// BitLayer 链配置
export const bitLayer = {
  id: 200901,
  name: 'BitLayer',
  nativeCurrency: {
    decimals: 18,
    name: 'BTC',
    symbol: 'BTC',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.bitlayer.org'],
    },
    public: {
      http: ['https://testnet-rpc.bitlayer.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BitLayerScan',
      url: 'https://testnet-scan.bitlayer.org',
    },
  },
  testnet: false,
} as const satisfies Chain

// Movement EVM Testnet 链配置
export const movementEvmTestnet = {
  id: 8997,
  name: 'Movement Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MOVR',
    symbol: 'MOVR',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.movement.network'],
    },
    public: {
      http: ['https://testnet-rpc.movement.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'MovementScan Testnet',
      url: 'https://testnet-explorer.movement.network',
    },
  },
  testnet: true,
} as const satisfies Chain

// 链图标映射
export const chainIcons = {
  [bsc.id]: '/images/chains/bsc.svg',
  [bitLayer.id]: '/images/chains/bitlayer.svg',
  [movementEvmTestnet.id]: '/images/chains/movement-evm.svg',
} as const

// 支持的链
export const chains = [
  bsc,
  bitLayer,
  movementEvmTestnet,
] as const

// RainbowKit 配置
export const config = getDefaultConfig({
  appName: WEB3_APP_CONFIG.appName,
  projectId: WEB3_APP_CONFIG.projectId,
  chains,
  ssr: true,
})
