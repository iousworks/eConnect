// Shared user storage for development
// In a real application, this would be in a database
const userStore = {
  users: [],
  userIdCounter: 1,

  // Add a user
  addUser(userData) {
    const user = {
      _id: this.userIdCounter++,
      ...userData,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true
    }
    this.users.push(user)
    return user
  },

  // Find user by email
  findByEmail(email) {
    return this.users.find(user => user.email === email.toLowerCase())
  },

  // Find user by ID
  findById(id) {
    return this.users.find(user => user._id === id)
  },

  // Update user
  updateUser(id, updates) {
    const userIndex = this.users.findIndex(user => user._id === id)
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates }
      return this.users[userIndex]
    }
    return null
  },

  // Get all users
  getAllUsers() {
    return this.users.map(user => ({
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
  }
}

// Add some default test users
if (userStore.users.length === 0) {
  userStore.addUser({
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    role: 'student',
    password: 'password123'
  })
  
  userStore.addUser({
    email: 'educator@example.com',
    firstName: 'Teacher',
    lastName: 'Smith',
    fullName: 'Teacher Smith',
    role: 'educator',
    password: 'password123'
  })
  
  userStore.addUser({
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    role: 'admin',
    password: 'password123'
  })
}

export default userStore