import dbConnect from '../../lib/mongodb'
import User from '../../models/User'
import { withAuth, requireRole } from '../../lib/auth'

async function handler(req, res) {
  try {
    // Connect to database
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return await getUsers(req, res)
      
      case 'PUT':
        return await updateUser(req, res)
      
      case 'DELETE':
        return await deleteUser(req, res)
      
      default:
        return res.status(405).json({
          error: 'Method not allowed',
          message: `${req.method} method is not supported for this endpoint`
        })
    }
  } catch (error) {
    console.error('Users API error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to process request. Please try again later.'
    })
  }
}

/**
 * Get users (with filtering and pagination)
 */
async function getUsers(req, res) {
  try {
    const { 
      page = 1, 
      limit = 10, 
      role, 
      search, 
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    // Build query
    const query = { isActive: true }
    
    if (role && role !== 'all') {
      query.role = role
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)

    // Execute queries
    const [users, totalCount] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ])

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / parseInt(limit))
    const hasNextPage = parseInt(page) < totalPages
    const hasPrevPage = parseInt(page) > 1

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      }
    })
  } catch (error) {
    throw error
  }
}

/**
 * Update user (only own profile or admin can update others)
 */
async function updateUser(req, res) {
  try {
    const { userId } = req.query
    const { firstName, lastName, profile, preferences } = req.body

    // Check if user can update this profile
    if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only update your own profile'
      })
    }

    // Find and update user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User not found'
      })
    }

    // Update allowed fields
    if (firstName) user.firstName = firstName.trim()
    if (lastName) user.lastName = lastName.trim()
    if (profile) {
      user.profile = { ...user.profile, ...profile }
    }
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences }
    }

    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON()
    })
  } catch (error) {
    throw error
  }
}

/**
 * Delete user (admin only)
 */
async function deleteUser(req, res) {
  try {
    const { userId } = req.query

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User not found'
      })
    }

    // Soft delete (deactivate user)
    user.isActive = false
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'User deactivated successfully'
    })
  } catch (error) {
    throw error
  }
}

// Export handler with authentication middleware
// Regular users can view users, but only admin can delete
export default withAuth(handler)