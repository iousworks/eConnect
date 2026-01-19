/**
 * Accessibility utilities and helpers
 */

/**
 * Manage focus trap within a modal or dialog
 * @param {HTMLElement} element - The container element to trap focus within
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  function handleTabKey(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)
  
  // Focus the first element
  if (firstElement) {
    firstElement.focus()
  }

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Announce content to screen readers
 * @param {string} message - The message to announce
 * @param {string} priority - The priority level ('polite' or 'assertive')
 */
export function announce(message, priority = 'polite') {
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', priority)
  announcer.setAttribute('aria-atomic', 'true')
  announcer.setAttribute('class', 'sr-only')
  
  document.body.appendChild(announcer)
  announcer.textContent = message
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcer)
  }, 1000)
}

/**
 * Generate a unique ID for form elements
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if an element is visible to screen readers
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element is accessible
 */
export function isAccessible(element) {
  const style = window.getComputedStyle(element)
  return !(
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0' ||
    element.hasAttribute('aria-hidden') ||
    element.hasAttribute('hidden')
  )
}

/**
 * Add skip links for keyboard navigation
 * @param {Array} links - Array of {href, text} objects
 */
export function addSkipLinks(links) {
  const skipContainer = document.createElement('div')
  skipContainer.className = 'skip-links'
  skipContainer.innerHTML = links
    .map(
      (link) =>
        `<a href="${link.href}" class="skip-link">${link.text}</a>`
    )
    .join('')
  
  document.body.insertBefore(skipContainer, document.body.firstChild)
}

/**
 * Validate form accessibility
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {Object} Validation results
 */
export function validateFormAccessibility(form) {
  const issues = []
  const inputs = form.querySelectorAll('input, select, textarea')
  
  inputs.forEach((input) => {
    // Check for labels
    const label = form.querySelector(`label[for="${input.id}"]`)
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledby = input.getAttribute('aria-labelledby')
    
    if (!label && !ariaLabel && !ariaLabelledby) {
      issues.push(`Input "${input.name || input.type}" is missing a label`)
    }
    
    // Check for required field indicators
    if (input.hasAttribute('required')) {
      const hasRequiredIndicator = 
        input.getAttribute('aria-required') === 'true' ||
        form.querySelector(`[aria-describedby="${input.id}"]`)
      
      if (!hasRequiredIndicator) {
        issues.push(`Required field "${input.name || input.type}" should have aria-required or description`)
      }
    }
  })
  
  return {
    isValid: issues.length === 0,
    issues
  }
}

/**
 * Create accessible button with proper ARIA attributes
 * @param {Object} options - Button options
 * @returns {HTMLButtonElement} Accessible button element
 */
export function createAccessibleButton({
  text,
  ariaLabel,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) {
  const button = document.createElement('button')
  button.type = type
  button.textContent = text
  button.className = className
  button.disabled = disabled
  
  if (ariaLabel) {
    button.setAttribute('aria-label', ariaLabel)
  }
  
  if (onClick) {
    button.addEventListener('click', onClick)
  }
  
  return button
}

/**
 * Ensure proper heading hierarchy
 * @param {HTMLElement} container - Container to check
 * @returns {Array} Array of heading level issues
 */
export function checkHeadingHierarchy(container = document) {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const issues = []
  let previousLevel = 0
  
  headings.forEach((heading, index) => {
    const currentLevel = parseInt(heading.tagName.charAt(1))
    
    if (index === 0 && currentLevel !== 1) {
      issues.push('Page should start with h1')
    }
    
    if (currentLevel - previousLevel > 1) {
      issues.push(`Heading level jumps from h${previousLevel} to h${currentLevel}`)
    }
    
    previousLevel = currentLevel
  })
  
  return issues
}

/**
 * Create accessible modal/dialog
 * @param {Object} options - Modal options
 * @returns {Object} Modal object with show/hide methods
 */
export function createAccessibleModal({
  title,
  content,
  onClose,
  className = ''
}) {
  const modal = document.createElement('div')
  modal.className = `modal ${className}`
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')
  modal.setAttribute('aria-labelledby', 'modal-title')
  
  const titleId = generateId('modal-title')
  
  modal.innerHTML = `
    <div class="modal-backdrop" aria-hidden="true"></div>
    <div class="modal-content" role="document">
      <div class="modal-header">
        <h2 id="${titleId}" class="modal-title">${title}</h2>
        <button type="button" class="modal-close" aria-label="Close modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `
  
  const closeButton = modal.querySelector('.modal-close')
  const backdrop = modal.querySelector('.modal-backdrop')
  
  let cleanup = null
  
  function show() {
    document.body.appendChild(modal)
    cleanup = trapFocus(modal.querySelector('.modal-content'))
    
    // Close on escape key
    function handleEscape(e) {
      if (e.key === 'Escape') {
        hide()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    // Close on backdrop click
    backdrop.addEventListener('click', hide)
    closeButton.addEventListener('click', hide)
    
    // Cleanup function
    const originalCleanup = cleanup
    cleanup = () => {
      originalCleanup()
      document.removeEventListener('keydown', handleEscape)
    }
  }
  
  function hide() {
    if (cleanup) {
      cleanup()
    }
    if (modal.parentNode) {
      document.body.removeChild(modal)
    }
    if (onClose) {
      onClose()
    }
  }
  
  return { show, hide, modal }
}