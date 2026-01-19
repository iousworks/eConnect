import userStore from '../../lib/userStore'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return list of users
    const users = userStore.getAllUsers()

    return res.status(200).json({
      success: true,
      users: users,
      total: users.length,
      developmentMode: true,
      message: 'Development mode - using in-memory data'
    })
  }

  if (req.method === 'POST') {
    // Add new user (from registration)
    const userData = req.body
    const newUser = userStore.addUser({
      ...userData,
      fullName: `${userData.firstName} ${userData.lastName}`
    })
    
    return res.status(201).json({
      success: true,
      user: newUser,
      developmentMode: true
    })
  }

  if (req.method === 'PUT') {
    // Update user
    const { id } = req.query
    const updatedUser = userStore.updateUser(parseInt(id), req.body)
    
    if (!updatedUser) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    
    return res.status(200).json({
      success: true,
      user: updatedUser,
      developmentMode: true
    })
  }

  if (req.method === 'DELETE') {
    // Delete user (not implemented in simple store, but could be added)
    return res.status(501).json({
      error: 'Delete operation not implemented in development mode'
    })
  }

  return res.status(405).json({
    error: 'Method not allowed'
  })
}