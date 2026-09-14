import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bnetcmsus-a.akamaihd.net' },
      { protocol: 'https', hostname: 'blz-contentstack-images.akamaized.net' },
    ],
  },
}

export default nextConfig
