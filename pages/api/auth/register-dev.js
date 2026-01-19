import { generateToken } from '../../../lib/auth'
import { validateRegistrationData, sanitizeString } from '../../../lib/validation'

// In-memory storage for development (data will be lost on server restart)
let users = []
let userIdCounter = 1

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are allowed for this endpoint'
    })
  }

  try {
    // Extract and sanitize input data
    const { email, password, firstName, lastName, role } = req.body

    const sanitizedData = {
      email: sanitizeString(email || '').toLowerCase(),
      password: password || '',
      firstName: sanitizeString(firstName || ''),
      lastName: sanitizeString(lastName || ''),
      role: sanitizeString(role || 'student')
    }

    // Basic validation
    if (!sanitizedData.email || !sanitizedData.password || !sanitizedData.firstName || !sanitizedData.lastName) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'All fields are required',
        details: ['Email, password, first name, and last name are required']
      })
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(sanitizedData.email)) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid email format'
      })
    }

    // Password validation
    if (sanitizedData.password.length < 6) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Password must be at least 6 characters long'
      })
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === sanitizedData.email)
    if (existingUser) {
      return res.status(409).json({
        error: 'Registration failed',
        message: 'An account with this email already exists'
      })
    }

    // Create new user
    const user = {
      _id: userIdCounter++,
      email: sanitizedData.email,
      firstName: sanitizedData.firstName,
      lastName: sanitizedData.lastName,
      fullName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
      role: sanitizedData.role,
      isActive: true,
      createdAt: new Date(),
      lastLogin: null
    }

    // Add to in-memory storage
    users.push(user)

    // Generate JWT token
    const token = generateToken(user._id)

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully! (Development mode - data will be lost on server restart)',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      token,
      developmentMode: true
    })

  } catch (error) {
    console.error('Registration error:', error)

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to create account. Please try again later.',
      developmentMode: true
    })
  }
}