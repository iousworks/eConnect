import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Calendar, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  FileText,
  Video,
  PenTool
} from 'lucide-react'

export default function UpcomingAssignments({ assignments = [] }) {
  const getAssignmentIcon = (type) => {
    switch(type) {
      case 'essay': return PenTool
      case 'video': return Video
      case 'quiz': return CheckCircle2
      default: return FileText
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'overdue': return 'bg-red-100 text-red-700'
      case 'due-soon': return 'bg-yellow-100 text-yellow-700'
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-300'
    }
  }

  const formatDueDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Due today'
    if (diffDays === 1) return 'Due tomorrow'
    return `Due in ${diffDays} days`
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={18} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Upcoming Assignments</h2>
          </div>
          <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">
            See all
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {assignments.length > 0 ? (
          <div className="space-y-4">
            {assignments.map((assignment, index) => {
              const IconComponent = getAssignmentIcon(assignment.type)
              
              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-l-4 ${getPriorityColor(assignment.priority)} bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent size={20} className="text-purple-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {assignment.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {assignment.subtitle || assignment.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <BookOpen size={12} />
                              <span>{assignment.course}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{formatDueDate(assignment.dueDate)}</span>
                            </span>
                            {assignment.points && (
                              <span>{assignment.points} points</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-4 flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                            {assignment.status === 'upcoming' ? 'Upcoming' : assignment.status}
                          </span>
                          
                          {assignment.priority && (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              assignment.priority === 'high' 
                                ? 'bg-red-100 text-red-600'
                                : assignment.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {assignment.priority} priority
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {assignment.instructions && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          {assignment.instructions}
                        </p>
                      )}
                      
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="btn btn-primary text-xs px-3 py-1">
                          View Assignment
                        </button>
                        {assignment.allowSubmission && (
                          <button className="btn btn-secondary text-xs px-3 py-1">
                            Submit Work
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No upcoming assignments at the moment</p>
          </div>
        )}
      </div>
    </div>
  )
}