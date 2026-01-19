import jwt from 'jsonwebtoken'
import User from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
export function generateToken(userId) {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object} Decoded token payload
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

/**
 * Middleware to authenticate requests
 * @param {Function} handler - Route handler
 * @returns {Function} Wrapped handler
 */
export function withAuth(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          error: 'Access denied',
          message: 'No token provided or invalid format'
        })
      }

      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      
      // Verify token
      const decoded = verifyToken(token)
      
      // Find user
      const user = await User.findById(decoded.userId).select('-password')
      
      if (!user || !user.isActive) {
        return res.status(401).json({
          error: 'Access denied',
          message: 'Invalid user or account deactivated'
        })
      }

      // Attach user to request
      req.user = user

      // Call the original handler
      return handler(req, res)
    } catch (error) {
      console.error('Auth middleware error:', error.message)
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid or expired token'
      })
    }
  }
}

/**
 * Middleware to check user roles
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {Function} Role check middleware
 */
export function requireRole(allowedRoles) {
  return (handler) => {
    return withAuth(async (req, res) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Insufficient permissions'
        })
      }
      
      return handler(req, res)
    })
  }
}