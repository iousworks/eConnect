const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticateToken, isEducatorOrAdmin } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: req.user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch profile',
      message: error.message
    });
  }
});

// Update user profile
router.put('/profile', [
  authenticateToken,
  body('firstName').optional().trim().notEmpty(),
  body('lastName').optional().trim().notEmpty(),
  body('phoneNumber').optional().trim(),
  body('institution').optional().trim(),
  body('grade').optional().trim(),
  body('subject').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const allowedUpdates = ['firstName', 'lastName', 'phoneNumber', 'institution', 'grade', 'subject'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Role-specific validations
    if (req.user.role === 'student' && updates.subject) {
      delete updates.subject; // Students can't set subject
    }
    if (req.user.role === 'educator' && updates.grade) {
      delete updates.grade; // Educators can't set grade
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser.toJSON()
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

// Get all users (educators and admins only)
router.get('/', authenticateToken, isEducatorOrAdmin, async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;
    const query = {};

    if (role && ['student', 'educator'].includes(role)) {
      query.role = role;
    }

    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// Get user by ID (educators and admins only)
router.get('/:id', authenticateToken, isEducatorOrAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json({
      user: user.toJSON()
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch user',
      message: error.message
    });
  }
});

// Search users
router.get('/search/:query', authenticateToken, async (req, res) => {
  try {
    const { query } = req.params;
    const { role } = req.query;

    const searchQuery = {
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { institution: { $regex: query, $options: 'i' } }
      ]
    };

    if (role && ['student', 'educator'].includes(role)) {
      searchQuery.role = role;
    }

    const users = await User.find(searchQuery)
      .select('-password')
      .limit(20)
      .sort({ firstName: 1 });

    res.json({
      users: users.map(user => user.toJSON()),
      count: users.length
    });

  } catch (error) {
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

module.exports = router;