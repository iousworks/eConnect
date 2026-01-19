import { motion } from 'framer-motion'
import { BookOpen, Clock, BarChart3 } from 'lucide-react'

export default function LearningProgress({ courses = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">My Learning</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600">
                    Progress: {course.completedLessons || 0}/{course.totalLessons || 0} lessons
                  </p>
                </div>
                <div className="ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'completed' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {course.status || 'In Progress'}
                  </span>
                </div>
              </div>
              
              {/* Course Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Course Progress</span>
                  <span>{course.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-primary-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress || 0}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  ></motion.div>
                </div>
              </div>

              {/* Completion Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Completion Progress</span>
                  <span>{course.completionRate || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${course.completionRate || 0}%` }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                  ></motion.div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <BookOpen size={12} />
                  <span>{course.totalLessons || 0} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{course.estimatedTime || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BarChart3 size={12} />
                  <span>{course.difficulty || 'Intermediate'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
            <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
            <button className="btn btn-primary">Browse Courses</button>
          </div>
        )}
      </div>
    </div>
  )
}