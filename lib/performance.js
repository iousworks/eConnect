/**
 * Performance monitoring and optimization utilities
 */

/**
 * Measure and log component render time
 * @param {string} componentName - Name of the component
 * @param {Function} renderFunction - Function to measure
 * @returns {any} Result of the render function
 */
export function measureRender(componentName, renderFunction) {
  if (process.env.NODE_ENV !== 'production') {
    const startTime = performance.now()
    const result = renderFunction()
    const endTime = performance.now()
    
    if (endTime - startTime > 16) { // Warn if render takes longer than one frame
      console.warn(`Slow render detected in ${componentName}: ${(endTime - startTime).toFixed(2)}ms`)
    }
    
    return result
  }
  
  return renderFunction()
}

/**
 * Simple memoization function
 * @param {Function} fn - Function to memoize
 * @param {Function} getKey - Function to generate cache key
 * @returns {Function} Memoized function
 */
export function memoize(fn, getKey = (...args) => JSON.stringify(args)) {
  const cache = new Map()
  
  return function(...args) {
    const key = getKey(...args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn.apply(this, args)
    cache.set(key, result)
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }
    
    return result
  }
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} img - Image element
 * @param {string} src - Image source URL
 * @param {Object} options - Observer options
 */
export function lazyLoadImage(img, src, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target
        image.src = src
        image.classList.remove('lazy')
        image.classList.add('lazy-loaded')
        observer.unobserve(image)
      }
    })
  }, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options
  })
  
  observer.observe(img)
}

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource objects {href, as, type}
 */
export function preloadResources(resources) {
  resources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as
    
    if (resource.type) {
      link.type = resource.type
    }
    
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin
    }
    
    document.head.appendChild(link)
  })
}

/**
 * Bundle size analyzer (development only)
 */
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== 'production') {
    import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
      console.log('Bundle analysis available via webpack-bundle-analyzer')
    }).catch(() => {
      console.log('Install webpack-bundle-analyzer to analyze bundle size')
    })
  }
}

/**
 * Monitor Core Web Vitals
 */
export function monitorWebVitals() {
  function getCLS(onPerfEntry) {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          onPerfEntry(entry)
        }
      }
    }).observe({ type: 'layout-shift', buffered: true })
  }

  function getFID(onPerfEntry) {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        onPerfEntry(entry)
      }
    }).observe({ type: 'first-input', buffered: true })
  }

  function getFCP(onPerfEntry) {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          onPerfEntry(entry)
        }
      }
    }).observe({ type: 'paint', buffered: true })
  }

  function getLCP(onPerfEntry) {
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      onPerfEntry(lastEntry)
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  }

  function getTTFB(onPerfEntry) {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          onPerfEntry(entry)
        }
      }
    }).observe({ type: 'navigation', buffered: true })
  }

  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const logMetric = (metric) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(metric)
      }
      
      // Send to analytics in production
      if (process.env.NODE_ENV === 'production' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          event_label: metric.id,
          non_interaction: true,
        })
      }
    }

    getCLS(logMetric)
    getFID(logMetric)
    getFCP(logMetric)
    getLCP(logMetric)
    getTTFB(logMetric)
  }
}

/**
 * Optimize images for different screen sizes
 * @param {string} src - Base image source
 * @param {Object} sizes - Size variants
 * @returns {Object} Optimized image sources
 */
export function generateImageSizes(src, sizes = {}) {
  const defaultSizes = {
    small: 320,
    medium: 768,
    large: 1024,
    xlarge: 1440
  }
  
  const imageSizes = { ...defaultSizes, ...sizes }
  const srcSet = Object.entries(imageSizes)
    .map(([size, width]) => {
      // Assuming you have an image optimization service
      const optimizedSrc = src.includes('?') 
        ? `${src}&w=${width}&q=75`
        : `${src}?w=${width}&q=75`
      return `${optimizedSrc} ${width}w`
    })
    .join(', ')
  
  return {
    src,
    srcSet,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }
}

/**
 * Critical CSS inlining
 * @param {string} css - Critical CSS string
 */
export function inlineCriticalCSS(css) {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style')
    style.textContent = css
    style.setAttribute('data-critical-css', 'true')
    document.head.insertBefore(style, document.head.firstChild)
  }
}

/**
 * Service Worker registration for caching
 * @param {string} swPath - Path to service worker file
 */
export async function registerServiceWorker(swPath = '/sw.js') {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register(swPath)
      console.log('Service Worker registered successfully:', registration.scope)
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              if (confirm('A new version is available. Refresh to update?')) {
                window.location.reload()
              }
            }
          })
        }
      })
    } catch (error) {
      console.log('Service Worker registration failed:', error)
    }
  }
}