import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'
import { generateToken } from '../../../lib/auth'
import { validateLoginData, sanitizeString } from '../../../lib/validation'

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
    const { email, password } = req.body

    const sanitizedData = {
      email: sanitizeString(email).toLowerCase(),
      password: password // Don't sanitize password
    }

    // Validate input data
    const validation = validateLoginData(sanitizedData)
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please correct the following errors',
        details: validation.errors
      })
    }

    // Find user by email
    const user = await User.findByEmail(sanitizedData.email)
    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password'
      })
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Your account has been deactivated. Please contact support.'
      })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(sanitizedData.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid email or password'
      })
    }

    // Update last login timestamp
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = generateToken(user._id)

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)

    // Generic error response (don't reveal specific error details for security)
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to process login request. Please try again later.'
    })
  }
}