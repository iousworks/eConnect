/**
 * URL utilities for clean URL handling and navigation
 */

/**
 * Clean URL by removing trailing slashes and normalizing
 * @param {string} url - URL to clean
 * @returns {string} Cleaned URL
 */
export function cleanUrl(url) {
  if (!url || url === '/') return '/'
  
  // Remove trailing slashes
  let cleanedUrl = url.replace(/\/+$/, '')
  
  // Ensure it starts with /
  if (!cleanedUrl.startsWith('/')) {
    cleanedUrl = '/' + cleanedUrl
  }
  
  // Remove double slashes
  cleanedUrl = cleanedUrl.replace(/\/+/g, '/')
  
  return cleanedUrl
}

/**
 * Build clean API URL
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} Clean API URL
 */
export function buildApiUrl(endpoint, params = {}) {
  const baseUrl = '/api'
  const cleanEndpoint = cleanUrl(endpoint)
  const fullUrl = `${baseUrl}${cleanEndpoint}`
  
  // Add query parameters if provided
  if (Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString()
    return `${fullUrl}?${queryString}`
  }
  
  return fullUrl
}

/**
 * Build clean page URL
 * @param {string} path - Page path
 * @param {Object} query - Query parameters
 * @returns {string} Clean page URL
 */
export function buildPageUrl(path, query = {}) {
  const cleanPath = cleanUrl(path)
  
  if (Object.keys(query).length > 0) {
    const queryString = new URLSearchParams(query).toString()
    return `${cleanPath}?${queryString}`
  }
  
  return cleanPath
}

/**
 * Get canonical URL for SEO
 * @param {string} path - Page path
 * @param {string} baseUrl - Base URL (optional)
 * @returns {string} Canonical URL
 */
export function getCanonicalUrl(path, baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000') {
  const cleanPath = cleanUrl(path)
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '')
  
  return `${cleanBaseUrl}${cleanPath}`
}

/**
 * Generate breadcrumb URLs from path
 * @param {string} path - Current path
 * @returns {Array} Array of breadcrumb objects
 */
export function generateBreadcrumbs(path) {
  const segments = path.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Home', url: '/' }]
  
  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
    
    breadcrumbs.push({
      label,
      url: cleanUrl(currentPath),
      isLast: index === segments.length - 1
    })
  })
  
  return breadcrumbs
}

/**
 * Check if URL is external
 * @param {string} url - URL to check
 * @returns {boolean} Whether URL is external
 */
export function isExternalUrl(url) {
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.origin !== window.location.origin
  } catch {
    return false
  }
}

/**
 * Get slug from title for clean URLs
 * @param {string} title - Title to convert
 * @returns {string} URL slug
 */
export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Parse query string into object
 * @param {string} queryString - Query string to parse
 * @returns {Object} Parsed query parameters
 */
export function parseQuery(queryString) {
  if (!queryString) return {}
  
  const params = new URLSearchParams(queryString)
  const result = {}
  
  for (const [key, value] of params) {
    result[key] = value
  }
  
  return result
}

/**
 * Validate and sanitize URL path
 * @param {string} path - Path to validate
 * @returns {string} Sanitized path
 */
export function sanitizePath(path) {
  if (!path) return '/'
  
  // Remove potentially dangerous characters
  let sanitized = path.replace(/[<>:"\\|?*]/g, '')
  
  // Ensure proper format
  sanitized = cleanUrl(sanitized)
  
  // Limit length
  if (sanitized.length > 200) {
    sanitized = sanitized.substring(0, 200)
  }
  
  return sanitized
}

/**
 * URL constants for the application
 */
export const URLS = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // API endpoints
  API: {
    HEALTH: '/api/health',
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout'
    },
    USERS: '/api/users',
    COURSES: '/api/courses'
  }
}

/**
 * Navigation helper for clean URL routing
 * @param {Object} router - Next.js router object
 * @param {string} url - URL to navigate to
 * @param {Object} options - Navigation options
 */
export function navigateToCleanUrl(router, url, options = {}) {
  const cleanedUrl = cleanUrl(url)
  const { replace = false, shallow = false } = options
  
  if (replace) {
    router.replace(cleanedUrl, undefined, { shallow })
  } else {
    router.push(cleanedUrl, undefined, { shallow })
  }
}

/**
 * Get current clean URL from router
 * @param {Object} router - Next.js router object
 * @returns {string} Current clean URL
 */
export function getCurrentCleanUrl(router) {
  return cleanUrl(router.asPath.split('?')[0])
}