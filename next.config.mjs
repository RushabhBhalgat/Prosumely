/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for production deployment outside Vercel
  output: 'standalone',
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  experimental: {
    reactCompiler: false,
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
    domains: ['prosumely-surd3.ondigitalocean.app', 'prosumely.com', 'www.prosumely.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Ensure proper cache behavior for dynamic content
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ]
  },
}

export default nextConfig
