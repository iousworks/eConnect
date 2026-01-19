import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  BookOpen,
  BarChart3,
  Calendar,
  GraduationCap,
  Settings,
  Home,
  User,
  Trophy,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

export default function StudentPortal() {
  const [selectedTab, setSelectedTab] = useState('learning')

  // Sample student data
  const studentData = {
    name: "Student",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    courses: [
      {
        id: 1,
        title: "Advanced Web Development",
        progress: 68,
        totalLessons: 24,
        completedLessons: 16,
        status: "In Progress"
      },
      {
        id: 2,
        title: "Machine Learning",
        progress: 73,
        totalLessons: 30,
        completedLessons: 22,
        status: "In Progress"
      }
    ],
    assignments: [
      {
        id: 1,
        title: "Advanced Web Development",
        subtitle: "Upcoming Assignment",
        course: "Web Dev",
        dueDate: "2024-01-25",
        status: "upcoming",
        priority: "high"
      },
      {
        id: 2,
        title: "Machine Learning", 
        subtitle: "Upcoming Assignment",
        course: "ML",
        dueDate: "2024-01-28",
        status: "upcoming",
        priority: "medium"
      }
    ],
    grades: [
      {
        course: "Student",
        grade: "95%",
        status: "excellent",
        progress: 95
      },
      {
        course: "Grade",
        grade: "88%", 
        status: "good",
        progress: 88
      }
    ]
  }

  const sidebarItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: BookOpen, label: 'Student Portal', id: 'portal', active: true },
    { icon: BarChart3, label: 'Secure Platform', id: 'secure' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: User, label: 'Connect', id: 'connect' }
  ]

  return (
    <>
      <Head>
        <title>Student Portal - eConnect</title>
        <meta name="description" content="Student learning dashboard and progress tracking" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20">
            <div className="p-6">
              <h1 className="text-xl font-bold text-white mb-8">eConnect</h1>
              
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.id}
                      href="#"
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        item.active 
                          ? 'bg-white/20 text-white' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-8">
                  <a href="#" className="text-gray-600 hover:text-primary-500 font-medium">Features</a>
                  <a href="#" className="text-gray-600 hover:text-primary-500 font-medium">About</a>
                  <a href="#" className="text-gray-600 hover:text-primary-500 font-medium">Contact</a>
                </div>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </nav>

            {/* Student Portal Content */}
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                          <User className="text-white" size={24} />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
                          <p className="text-gray-600">Seamless student experience with progress tracking</p>
                        </div>
                      </div>
                      <button className="btn btn-primary">Reactivate</button>
                    </div>
                  </div>

                  {/* Student Profile */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{studentData.name}</p>
                        <p className="text-sm text-gray-600">Your student</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Progress Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">My Learning</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {studentData.courses.map((course) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Progress: {course.completedLessons}/{course.totalLessons} lessons
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Complete Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Completion Progress */}
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Completion Progress</span>
                              <span>{Math.round((course.completedLessons / course.totalLessons) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assignments and Grades Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Upcoming Assignments */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Upcoming Assignments</h2>
                        <button className="text-primary-500 hover:text-primary-600 font-medium">See all</button>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {studentData.assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen size={16} className="text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                            <p className="text-sm text-gray-600">{assignment.subtitle}</p>
                          </div>
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            Upcoming
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grades */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900">Grades</h2>
                    </div>
                    <div className="p-6 space-y-4">
                      {studentData.grades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">{grade.course}</h3>
                            <p className="text-sm text-gray-600">Progress</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{grade.grade}</div>
                            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className={`h-2 rounded-full ${
                                  grade.status === 'excellent' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${grade.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}