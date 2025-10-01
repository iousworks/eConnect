const express = require('express');
const User = require('../models/User');
const { authenticateToken, isStudent, isEducator } = require('../middleware/auth');

const router = express.Router();

// Student Dashboard
router.get('/student', authenticateToken, isStudent, async (req, res) => {
  try {
    const student = req.user;

    // Get student statistics
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalEducators = await User.countDocuments({ role: 'educator', isActive: true });

    // Find educators in the same institution
    const sameInstitutionEducators = await User.find({
      role: 'educator',
      institution: student.institution,
      isActive: true
    }).select('firstName lastName subject email').limit(5);

    // Recent activities (placeholder for now)
    const recentActivities = [
      {
        id: 1,
        type: 'assignment',
        title: 'Math Assignment Due',
        description: 'Complete algebra problems 1-20',
        date: new Date(),
        status: 'pending'
      },
      {
        id: 2,
        type: 'announcement',
        title: 'Class Schedule Update',
        description: 'Physics class moved to 2 PM',
        date: new Date(Date.now() - 86400000), // Yesterday
        status: 'read'
      }
    ];

    // Upcoming events (placeholder)
    const upcomingEvents = [
      {
        id: 1,
        title: 'Math Quiz',
        date: new Date(Date.now() + 3 * 86400000), // 3 days from now
        subject: 'Mathematics',
        educator: 'Dr. Smith'
      },
      {
        id: 2,
        title: 'Science Fair',
        date: new Date(Date.now() + 7 * 86400000), // 1 week from now
        subject: 'Science',
        educator: 'Prof. Johnson'
      }
    ];

    res.json({
      student: student.toJSON(),
      statistics: {
        totalStudents,
        totalEducators,
        sameInstitutionEducators: sameInstitutionEducators.length
      },
      educators: sameInstitutionEducators,
      recentActivities,
      upcomingEvents
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to load student dashboard',
      message: error.message
    });
  }
});

// Educator Dashboard
router.get('/educator', authenticateToken, isEducator, async (req, res) => {
  try {
    const educator = req.user;

    // Get educator statistics
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const sameInstitutionStudents = await User.countDocuments({
      role: 'student',
      institution: educator.institution,
      isActive: true
    });
    const totalEducators = await User.countDocuments({ role: 'educator', isActive: true });

    // Find students in the same institution
    const recentStudents = await User.find({
      role: 'student',
      institution: educator.institution,
      isActive: true
    }).select('firstName lastName grade email registrationDate')
      .sort({ registrationDate: -1 })
      .limit(10);

    // Teaching schedule (placeholder)
    const teachingSchedule = [
      {
        id: 1,
        subject: educator.subject || 'Mathematics',
        class: 'Grade 10A',
        time: '09:00 AM',
        day: 'Monday',
        room: 'Room 101'
      },
      {
        id: 2,
        subject: educator.subject || 'Mathematics',
        class: 'Grade 10B',
        time: '11:00 AM',
        day: 'Monday',
        room: 'Room 102'
      },
      {
        id: 3,
        subject: educator.subject || 'Mathematics',
        class: 'Grade 11A',
        time: '02:00 PM',
        day: 'Tuesday',
        room: 'Room 101'
      }
    ];

    // Recent activities (placeholder)
    const recentActivities = [
      {
        id: 1,
        type: 'assignment_created',
        title: 'Created new assignment',
        description: 'Algebra problems for Grade 10',
        date: new Date(),
        class: 'Grade 10A'
      },
      {
        id: 2,
        type: 'student_registered',
        title: 'New student registered',
        description: 'John Doe joined your class',
        date: new Date(Date.now() - 86400000),
        class: 'Grade 10B'
      }
    ];

    // Assignment statistics (placeholder)
    const assignmentStats = {
      total: 12,
      pending: 3,
      graded: 8,
      overdue: 1
    };

    res.json({
      educator: educator.toJSON(),
      statistics: {
        totalStudents,
        sameInstitutionStudents,
        totalEducators,
        assignmentStats
      },
      recentStudents,
      teachingSchedule,
      recentActivities
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to load educator dashboard',
      message: error.message
    });
  }
});

// Get dashboard stats (common endpoint)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    const stats = {
      totalUsers: await User.countDocuments({ isActive: true }),
      totalStudents: await User.countDocuments({ role: 'student', isActive: true }),
      totalEducators: await User.countDocuments({ role: 'educator', isActive: true }),
      sameInstitution: await User.countDocuments({
        institution: user.institution,
        isActive: true
      })
    };

    // Add role-specific stats
    if (user.role === 'student') {
      stats.sameInstitutionEducators = await User.countDocuments({
        role: 'educator',
        institution: user.institution,
        isActive: true
      });
    } else if (user.role === 'educator') {
      stats.sameInstitutionStudents = await User.countDocuments({
        role: 'student',
        institution: user.institution,
        isActive: true
      });
    }

    res.json({ stats });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch dashboard stats',
      message: error.message
    });
  }
});

// Get recent users (for admin/educator dashboard)
router.get('/recent-users', authenticateToken, async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const recentUsers = await User.find({ isActive: true })
      .select('firstName lastName role institution registrationDate')
      .sort({ registrationDate: -1 })
      .limit(parseInt(limit));

    res.json({
      users: recentUsers.map(user => user.toJSON())
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch recent users',
      message: error.message
    });
  }
});

module.exports = router;