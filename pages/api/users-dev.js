// Development API endpoint for users
let users = [
  {
    _id: 1,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    role: 'student',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-01-20')
  },
  {
    _id: 2,
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    role: 'educator',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date('2024-01-19')
  },
  {
    _id: 3,
    email: 'admin@econnect.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-20')
  }
]

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return list of users (limit sensitive data)
    const safeUsers = users.map(user => ({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }))

    return res.status(200).json({
      success: true,
      users: safeUsers,
      total: safeUsers.length,
      developmentMode: true,
      message: 'Development mode - using in-memory data'
    })
  }

  if (req.method === 'POST') {
    // Add new user (from registration)
    const userData = req.body
    const newUser = {
      _id: users.length + 1,
      ...userData,
      fullName: `${userData.firstName} ${userData.lastName}`,
      isActive: true,
      createdAt: new Date(),
      lastLogin: null
    }
    
    users.push(newUser)
    
    return res.status(201).json({
      success: true,
      user: newUser,
      developmentMode: true
    })
  }

  if (req.method === 'PUT') {
    // Update user
    const { id } = req.query
    const userIndex = users.findIndex(u => u._id == id)
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    
    users[userIndex] = { ...users[userIndex], ...req.body }
    
    return res.status(200).json({
      success: true,
      user: users[userIndex],
      developmentMode: true
    })
  }

  if (req.method === 'DELETE') {
    // Delete user
    const { id } = req.query
    const userIndex = users.findIndex(u => u._id == id)
    
    if (userIndex === -1) {
      return res.status(404).json({
        error: 'User not found'
      })
    }
    
    users.splice(userIndex, 1)
    
    return res.status(200).json({
      success: true,
      message: 'User deleted',
      developmentMode: true
    })
  }

  return res.status(405).json({
    error: 'Method not allowed'
  })
}