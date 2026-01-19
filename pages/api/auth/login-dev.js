import userStore from '../../../lib/userStore'

// Simple JWT generation for development
function generateToken(userId) {
  const payload = {
    userId,
    iat: Date.now()
  }
  // Simple base64 encoding for development (not secure for production)
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

// Simple sanitization function for development
function sanitizeString(str) {
  if (!str || typeof str !== 'string') return ''
  return str.trim().replace(/[<>]/g, '')
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
    const user = userStore.findByEmail(sanitizedEmail)
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
    userStore.updateUser(user._id, { lastLogin: new Date() })

    // Generate JWT token
    const token = generateToken(user._id)

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Login successful as ${user.role}!`,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        lastLogin: new Date()
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