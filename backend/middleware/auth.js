const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Invalid token or user not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid token'
    });
  }
};

// Check if user has specific role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Check if user is student
const isStudent = authorizeRole('student');

// Check if user is educator
const isEducator = authorizeRole('educator');

// Check if user is admin
const isAdmin = authorizeRole('admin');

// Check if user is educator or admin
const isEducatorOrAdmin = authorizeRole('educator', 'admin');

module.exports = {
  authenticateToken,
  authorizeRole,
  isStudent,
  isEducator,
  isAdmin,
  isEducatorOrAdmin
};