import type { Metadata } from 'next'
import './globals.css'
import { ClientLayout } from '@/components/layouts/ClientLayout'

export const metadata: Metadata = {
  title: 'DeAgent AI',
  description: 'DeAgentAI is the largest AI Agent infrastructure across Sui, BSC, and BTC ecosystems, enabling trustless on-chain autonomous decisions for AI Agents.',
  metadataBase: new URL('https://deagent.ai'),
  openGraph: {
    type: 'website',
    title: 'DeAgent AI',
    description: 'DeAgentAI is the largest AI Agent infrastructure across Sui, BSC, and BTC ecosystems, enabling trustless on-chain autonomous decisions for AI Agents.',
    url: 'https://deagent.ai',
    siteName: 'DeAgent AI',
    images: [
      {
        url: 'https://deagent.ai/images/preview.jpeg',
        secureUrl: 'https://deagent.ai/images/preview.jpeg',
        width: 1200,
        height: 630,
        alt: 'DeAgent AI Web3 Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeAgent AI',
    description: 'DeAgent AI Web3 Platform',
    site: '@DeAgentAI',
    creator: '@DeAgentAI',
    images: ['https://deagent.ai/images/preview.jpeg'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon/android-chrome-512x512.png',
      },
    ],
  },
  other: {
    'grammarly-inline-cards': 'false',
    'grammarly-popups': 'false',
    'lt-disable': 'true',
    'telegram:image': 'https://deagent.ai/images/preview.jpeg',
    'telegram:card': 'summary_large_image',
    'telegram:title': 'DeAgent AI',
    'telegram:description': 'DeAgent AI Web3 Platform',
    'telegram:site': '@DeAgentAI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DeAgent AI',
              url: 'https://deagent.ai',
              description:
                'DeAgentAI is the largest AI Agent infrastructure across Sui, BSC, and BTC ecosystems, enabling trustless on-chain autonomous decisions for AI Agents.',
            }),
          }}
        />
        <style>{`
          /* 添加全局过渡效果，减少闪烁 */
          body {
            opacity: 0;
            transition: opacity 0.3s ease;
          }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            // 使用更安全的方式处理页面加载
            if (typeof window !== 'undefined') {
              // 页面加载完成后设置不透明度为1
              window.addEventListener('load', function() {
                setTimeout(function() {
                  if (document.body) {
                    document.body.style.opacity = '1';
                  }
                }, 0);
              });
            }
          `,
        }} />
      </head>
      <body className='font-sans' suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
