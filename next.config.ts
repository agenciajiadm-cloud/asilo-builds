import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'bnetcmsus-a.akamaihd.net' }],
  },
}

export default nextConfig
