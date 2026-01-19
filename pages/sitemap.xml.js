import { getCanonicalUrl } from '../lib/urls'

export default function Sitemap() {
  // getServerSideProps will handle the generation
  return null
}

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://econnect.vercel.app'
  
  // Static pages
  const staticPages = [
    '',
    '/dashboard',
  ]
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      const path = page === '' ? '' : page
      const cleanUrl = getCanonicalUrl(path, baseUrl)
      
      return `
    <url>
      <loc>${cleanUrl}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`
    })
    .join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}