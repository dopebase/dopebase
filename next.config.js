/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['firebase-admin'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    // Important: return the modified config
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      request: false,
      encoding: false,
    }

    return config
  },
}

module.exports = nextConfig
