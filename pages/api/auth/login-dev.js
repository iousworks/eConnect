import { generateToken } from '../../../lib/auth'
import { sanitizeString } from '../../../lib/validation'

// Import the same in-memory storage (in a real app, this would be in a shared module)
// For development purposes, we'll recreate a simple user store
let users = []

// Add a default test user
if (users.length === 0) {
  users.push({
    _id: 999,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    role: 'student',
    password: 'password123', // In real app, this would be hashed
    isActive: true,
    createdAt: new Date(),
    lastLogin: null
  })
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are allowed for this endpoint'
    })
  }

  try {
    const { email, password } = req.body

    const sanitizedEmail = sanitizeString(email || '').toLowerCase()
    const sanitizedPassword = password || ''

    // Basic validation
    if (!sanitizedEmail || !sanitizedPassword) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Email and password are required'
      })
    }

    // Find user
    const user = users.find(u => u.email === sanitizedEmail)
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password'
      })
    }

    // Check password (in real app, use bcrypt.compare)
    if (user.password !== sanitizedPassword) {
      return res.status(401).json({
        error: 'Authentication failed', 
        message: 'Invalid email or password'
      })
    }

    // Update last login
    user.lastLogin = new Date()

    // Generate JWT token
    const token = generateToken(user._id)

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      },
      token,
      developmentMode: true
    })

  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to authenticate. Please try again later.',
      developmentMode: true
    })
  }
}