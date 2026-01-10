import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000')

// Ensure production URL always uses www.prosumely.com for canonical consistency
const serverUrl =
  NEXT_PUBLIC_SERVER_URL.includes('prosumely.com') && !NEXT_PUBLIC_SERVER_URL.includes('www.')
    ? NEXT_PUBLIC_SERVER_URL.replace('prosumely.com', 'www.prosumely.com')
    : NEXT_PUBLIC_SERVER_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization for DigitalOcean buildpack compatibility
    remotePatterns: [
      ...[serverUrl].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Allow localhost for development
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
  // Add performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-select'],
  },
  // Optimize bundle
  webpack: (config, { isServer }) => {
    // Optimize for client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  // Add compression
  compress: true,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
