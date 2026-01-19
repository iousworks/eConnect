/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Clean URLs configuration
  trailingSlash: false,
  
  // Remove .html extensions and clean URLs
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/dashboard': { page: '/dashboard' },
      '/login': { page: '/' },
      '/register': { page: '/' },
    }
  },
  
  // Redirects for clean URLs
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dashboard.html',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/login.html',
        destination: '/',
        permanent: true,
      },
      // Remove trailing slashes
      {
        source: '/(.*?)/$',
        destination: '/$1',
        permanent: true,
      },
    ]
  },
  
  // Rewrites for API versioning and clean endpoints
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  
  images: {
    domains: ['localhost', 'vercel.app'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compress responses
  compress: true,
  
  // Power by header
  poweredByHeader: false,
  
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
};

module.exports = nextConfig;