import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Remove trailing slashes (except for root)
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }
  
  // Force lowercase URLs for SEO consistency
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase()
    return NextResponse.redirect(url, 301)
  }
  
  // Remove file extensions from URLs
  const extensions = ['.html', '.php', '.htm', '.aspx']
  const hasExtension = extensions.some(ext => url.pathname.endsWith(ext))
  
  if (hasExtension) {
    // Remove the extension
    const pathWithoutExt = url.pathname.replace(/\.(html|php|htm|aspx)$/, '')
    url.pathname = pathWithoutExt
    return NextResponse.redirect(url, 301)
  }
  
  // Add security headers
  const response = NextResponse.next()
  
  // Security headers for clean URLs
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  // SEO headers
  response.headers.set('X-Robots-Tag', 'index, follow')
  
  return response
}

export const config = {
  // Match all paths except:
  // - api routes
  // - _next static files
  // - favicon.ico
  // - images and other static assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)' 
  ]
}