import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'
import { generateToken } from '../../../lib/auth'
import { validateRegistrationData, sanitizeString } from '../../../lib/validation'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are allowed for this endpoint'
    })
  }

  try {
    // Connect to database
    await dbConnect()

    // Extract and sanitize input data
    const { email, password, firstName, lastName, role } = req.body

    const sanitizedData = {
      email: sanitizeString(email).toLowerCase(),
      password: password, // Don't sanitize password
      firstName: sanitizeString(firstName),
      lastName: sanitizeString(lastName),
      role: sanitizeString(role)
    }

    // Validate input data
    const validation = validateRegistrationData(sanitizedData)
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please correct the following errors',
        details: validation.errors
      })
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(sanitizedData.email)
    if (existingUser) {
      return res.status(409).json({
        error: 'Registration failed',
        message: 'An account with this email already exists'
      })
    }

    // Create new user
    const user = new User({
      email: sanitizedData.email,
      password: sanitizedData.password, // Will be hashed by pre-save middleware
      firstName: sanitizedData.firstName,
      lastName: sanitizedData.lastName,
      role: sanitizedData.role
    })

    // Save user to database
    await user.save()

    // Generate JWT token
    const token = generateToken(user._id)

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
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
      token
    })

  } catch (error) {
    console.error('Registration error:', error)

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Registration failed',
        message: 'An account with this email already exists'
      })
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please correct the following errors',
        details: validationErrors
      })
    }

    // Generic error response
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to create account. Please try again later.'
    })
  }
}