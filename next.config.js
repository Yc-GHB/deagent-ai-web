const screenerInternalBaseUrl =
  process.env.SCREENER_INTERNAL_BASE_URL || 'https://api-v1-test.deagent.ai'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deagent.ai',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/ai-agent', destination: '/agents', permanent: false },
      { source: '/products', destination: '/solutions', permanent: false },
      { source: '/event', destination: '/community', permanent: false },
    ]
  },
  async rewrites() {
    const base = screenerInternalBaseUrl.replace(/\/$/, '')
    return [
      { source: '/v1/screener/:path*', destination: `${base}/v1/screener/:path*` },
      { source: '/v1/waitlist', destination: `${base}/v1/waitlist` },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
