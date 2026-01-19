import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Award, 
  BarChart3, 
  Target,
  Star,
  CheckCircle2
} from 'lucide-react'

export default function GradesComponent({ grades = [] }) {
  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600' 
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressBarColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500'
    if (percentage >= 80) return 'bg-blue-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getLetterGrade = (percentage) => {
    if (percentage >= 97) return 'A+'
    if (percentage >= 93) return 'A'
    if (percentage >= 90) return 'A-'
    if (percentage >= 87) return 'B+'
    if (percentage >= 83) return 'B'
    if (percentage >= 80) return 'B-'
    if (percentage >= 77) return 'C+'
    if (percentage >= 73) return 'C'
    if (percentage >= 70) return 'C-'
    if (percentage >= 67) return 'D+'
    if (percentage >= 65) return 'D'
    return 'F'
  }

  const calculateGPA = () => {
    if (grades.length === 0) return 0
    const total = grades.reduce((sum, grade) => sum + grade.percentage, 0)
    return (total / grades.length / 25).toFixed(2) // Simple GPA calculation
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="text-green-600" size={18} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Grades</h2>
          </div>
          
          {grades.length > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{calculateGPA()}</div>
              <div className="text-sm text-gray-600">Current GPA</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {grades.length > 0 ? (
          <div className="space-y-4">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{grade.course}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        grade.status === 'excellent' 
                          ? 'bg-green-100 text-green-700'
                          : grade.status === 'good'
                          ? 'bg-blue-100 text-blue-700'
                          : grade.status === 'average'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {grade.status || 'Completed'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {grade.category || 'Overall Progress'}
                    </p>
                    
                    {/* Grade Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Grade Progress</span>
                        <span>{grade.percentage || grade.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full ${getProgressBarColor(grade.percentage || grade.progress)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${grade.percentage || grade.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Assignment Breakdown */}
                    {grade.assignments && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-500 mb-1">Recent Assignments:</div>
                        <div className="flex flex-wrap gap-1">
                          {grade.assignments.slice(0, 5).map((assignment, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {assignment.name}: {assignment.score}%
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${getGradeColor(grade.percentage || grade.progress)}`}>
                      {grade.grade || `${grade.percentage || grade.progress}%`}
                    </div>
                    <div className="text-lg font-medium text-gray-600">
                      {getLetterGrade(grade.percentage || grade.progress)}
                    </div>
                    {grade.trend && (
                      <div className={`flex items-center text-xs mt-1 ${
                        grade.trend === 'up' ? 'text-green-600' : 
                        grade.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <TrendingUp size={12} className={grade.trend === 'down' ? 'rotate-180' : ''} />
                        <span className="ml-1">{grade.trendValue || 'Stable'}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional Info */}
                {(grade.instructor || grade.lastUpdated) && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500">
                      {grade.instructor && (
                        <span>Instructor: {grade.instructor}</span>
                      )}
                      {grade.lastUpdated && (
                        <span>Updated: {new Date(grade.lastUpdated).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Overall Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {grades.length}
                </div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {grades.filter(g => (g.percentage || g.progress) >= 80).length}
                </div>
                <div className="text-sm text-gray-600">Above 80%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(grades.reduce((sum, g) => sum + (g.percentage || g.progress), 0) / grades.length)}%
                </div>
                <div className="text-sm text-gray-600">Average</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No grades available</h3>
            <p className="text-gray-600">Grades will appear here once assignments are submitted and graded</p>
          </div>
        )}
      </div>
    </div>
  )
}