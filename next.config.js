/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Clean URLs configuration
  trailingSlash: false,
  
  // Redirects for clean URLs and legacy support
  async redirects() {
    return [
      // Remove index from URLs
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Remove .html extensions
      {
        source: '/dashboard.html',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/404.html',
        destination: '/404',
        permanent: true,
      },
      // Remove .php extensions (legacy)
      {
        source: '/dashboard.php',
        destination: '/dashboard',
        permanent: true,
      },
      // Remove trailing slashes for consistency (except for root)
      {
        source: '/((?!api/).*?)/$',
        destination: '/$1',
        permanent: true,
      },
      // Clean about page URLs
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about.php',
        destination: '/about',
        permanent: true,
      },
      // Handle common file extensions
      {
        source: '/(.*)\.htm$',
        destination: '/$1',
        permanent: true,
      },
      // Redirect old auth URLs to clean URLs
      {
        source: '/auth/login',
        destination: '/?auth=login',
        permanent: true,
      },
      {
        source: '/auth/register',
        destination: '/?auth=register',
        permanent: true,
      },
    ]
  },
  
  // Rewrites for API versioning and clean endpoints
  async rewrites() {
    return [
      // API versioning support
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
      // Clean sitemap URL
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml.js',
      },
      // Clean robots.txt (if you add a dynamic one later)
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      // Clean profile URLs (if you add user profiles later)
      {
        source: '/profile/:username',
        destination: '/user/:username',
      },
      // Clean course URLs (for future course features)
      {
        source: '/course/:slug',
        destination: '/courses/:slug',
      },
    ]
  },

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
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