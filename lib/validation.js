/**
 * Input validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export function validatePassword(password) {
  const result = {
    isValid: true,
    errors: []
  }

  if (!password || password.length < 6) {
    result.isValid = false
    result.errors.push('Password must be at least 6 characters long')
  }

  if (!/(?=.*[a-z])/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter')
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter')
  }

  if (!/(?=.*\d)/.test(password)) {
    result.errors.push('Password must contain at least one number')
  }

  if (result.errors.length > 0) {
    result.isValid = false
  }

  return result
}

/**
 * Validate name fields
 * @param {string} name - Name to validate
 * @param {string} fieldName - Field name for error messages
 * @returns {Object} Validation result
 */
export function validateName(name, fieldName = 'Name') {
  const result = {
    isValid: true,
    errors: []
  }

  if (!name || name.trim().length === 0) {
    result.isValid = false
    result.errors.push(`${fieldName} is required`)
  } else if (name.trim().length < 2) {
    result.isValid = false
    result.errors.push(`${fieldName} must be at least 2 characters long`)
  } else if (name.trim().length > 50) {
    result.isValid = false
    result.errors.push(`${fieldName} cannot exceed 50 characters`)
  } else if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    result.isValid = false
    result.errors.push(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`)
  }

  return result
}

/**
 * Validate user role
 * @param {string} role - Role to validate
 * @returns {boolean} Is valid role
 */
export function isValidRole(role) {
  const validRoles = ['student', 'educator', 'admin']
  return validRoles.includes(role)
}

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return ''
  return input.trim().replace(/[<>]/g, '')
}

/**
 * Validate registration data
 * @param {Object} data - Registration data
 * @returns {Object} Validation result
 */
export function validateRegistrationData(data) {
  const errors = []
  
  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address')
  }

  // Validate password
  const passwordValidation = validatePassword(data.password)
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors)
  }

  // Validate first name
  const firstNameValidation = validateName(data.firstName, 'First name')
  if (!firstNameValidation.isValid) {
    errors.push(...firstNameValidation.errors)
  }

  // Validate last name
  const lastNameValidation = validateName(data.lastName, 'Last name')
  if (!lastNameValidation.isValid) {
    errors.push(...lastNameValidation.errors)
  }

  // Validate role
  if (!data.role || !isValidRole(data.role)) {
    errors.push('Please select a valid role')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate login data
 * @param {Object} data - Login data
 * @returns {Object} Validation result
 */
export function validateLoginData(data) {
  const errors = []

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address')
  }

  if (!data.password || data.password.length === 0) {
    errors.push('Password is required')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}