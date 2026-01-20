import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Calendar,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react'
import Footer from '../components/Footer'
import { getCanonicalUrl, navigateToCleanUrl, URLS } from '../lib/urls'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      navigateToCleanUrl(router, URLS.HOME, { replace: true })
      return
    }

    try {
      setUser(JSON.parse(userData))
      fetchDashboardData(token)
    } catch (error) {
      console.error('Error parsing user data:', error)
      navigateToCleanUrl(router, URLS.HOME, { replace: true })
    }
  }, [router])

  const fetchDashboardData = async (token) => {
    try {
      // Fetch users data
      const response = await fetch(URLS.API.USERS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigateToCleanUrl(router, URLS.HOME, { replace: true })
  }

  const stats = [
    {
      title: 'Total Students',
      value: users.filter(u => u.role === 'student').length,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Educators',
      value: users.filter(u => u.role === 'educator').length,
      icon: Award,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Courses',
      value: 12, // Mock data
      icon: BookOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Growth Rate',
      value: '+15%',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Head>
        <title>Dashboard - eConnect</title>
        <meta name="description" content="eConnect user dashboard for managing courses, students, and educational content" />
        <meta name="keywords" content="dashboard, education management, user portal, student management" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={getCanonicalUrl('/dashboard')} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dashboard - eConnect" />
        <meta property="og:description" content="Manage your educational content and track progress" />
        <meta property="og:url" content={getCanonicalUrl('/dashboard')} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gradient">eConnect</h1>
                <span className="ml-4 text-gray-600">Dashboard</span>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">3</span>
                </button>

                {/* User menu */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.fullName || `${user.firstName} ${user.lastName}`}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                    {user.firstName?.charAt(0) || 'U'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.firstName}! 👋
            </h2>
            <p className="text-gray-600">
              Here's what's happening with your education platform today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className="card card-hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { action: 'New user registered', user: 'John Doe', time: '2 hours ago' },
                      { action: 'Course published', user: 'Jane Smith', time: '4 hours ago' },
                      { action: 'Assignment submitted', user: 'Mike Johnson', time: '6 hours ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Add User', icon: Plus, color: 'bg-blue-500' },
                      { label: 'Create Course', icon: BookOpen, color: 'bg-green-500' },
                      { label: 'Schedule Event', icon: Calendar, color: 'bg-purple-500' },
                      { label: 'View Reports', icon: BarChart3, color: 'bg-orange-500' }
                    ].map((action, index) => (
                      <button
                        key={index}
                        className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className={`p-3 rounded-lg ${action.color} text-white mb-2`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Users Management</h3>
                  <button className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm">
                                {user.firstName?.charAt(0) || 'U'}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' :
                              user.role === 'educator' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="card">
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Management</h3>
                  <p className="text-gray-600 mb-6">This feature is coming soon!</p>
                  <button className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Course
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
                  <p className="text-gray-600">Platform settings and configuration options.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}