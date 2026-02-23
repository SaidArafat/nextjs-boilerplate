import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || ''
  },
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ''
      }
    ]
  }
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
