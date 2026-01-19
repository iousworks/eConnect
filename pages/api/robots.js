export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200')
  
  const robotsTxt = `User-agent: *
Allow: /
Allow: /dashboard

Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

# Sitemaps
Sitemap: ${process.env.NEXTAUTH_URL || 'https://econnect.vercel.app'}/sitemap.xml

# Crawl delay
Crawl-delay: 1`

  res.write(robotsTxt)
  res.end()
}