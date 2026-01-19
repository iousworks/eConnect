import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Code, 
  Database, 
  Shield, 
  Activity,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react'
import { buildApiUrl, URLS } from '../lib/urls'

const endpoints = [
  {
    id: 'health',
    name: 'Health Check',
    method: 'GET',
    path: URLS.API.HEALTH,
    description: 'Check if the API is running',
    icon: Activity,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 'register',
    name: 'User Registration',
    method: 'POST',
    path: URLS.API.AUTH.REGISTER,
    description: 'Register a new user',
    icon: Shield,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    body: {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'student'
    }
  },
  {
    id: 'login',
    name: 'User Login',
    method: 'POST',
    path: URLS.API.AUTH.LOGIN,
    description: 'Authenticate a user',
    icon: Shield,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    body: {
      email: 'test@example.com',
      password: 'password123'
    }
  },
  {
    id: 'users',
    name: 'Get Users',
    method: 'GET',
    path: URLS.API.USERS,
    description: 'Fetch all users (requires auth)',
    icon: Database,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    requiresAuth: true
  }
]

export default function ApiTester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [requestBody, setRequestBody] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [authToken, setAuthToken] = useState('')

  const handleEndpointSelect = (endpoint) => {
    setSelectedEndpoint(endpoint)
    setRequestBody(endpoint.body ? JSON.stringify(endpoint.body, null, 2) : '')
    setResponse(null)
  }

  const executeRequest = async () => {
    setIsLoading(true)
    setResponse(null)

    try {
      const headers = {
        'Content-Type': 'application/json',
      }

      // Add auth header if token exists and endpoint requires auth
      if (selectedEndpoint.requiresAuth && authToken) {
        headers.Authorization = `Bearer ${authToken}`
      }

      const options = {
        method: selectedEndpoint.method,
        headers,
      }

      if (selectedEndpoint.method === 'POST' && requestBody) {
        try {
          JSON.parse(requestBody) // Validate JSON
          options.body = requestBody
        } catch (error) {
          throw new Error('Invalid JSON in request body')
        }
      }

      const startTime = Date.now()
      const res = await fetch(selectedEndpoint.path, options)
      const endTime = Date.now()
      
      const data = await res.json()
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        responseTime: endTime - startTime,
        success: res.ok
      })

      // Store auth token if login was successful
      if (selectedEndpoint.id === 'login' && res.ok && data.token) {
        setAuthToken(data.token)
      }

    } catch (error) {
      setResponse({
        error: error.message,
        success: false
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card max-w-4xl mx-auto"
    >
      <div className="flex items-center mb-6">
        <Code className="h-8 w-8 text-primary-500 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">API Testing Interface</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Endpoint Selection */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Endpoints</h4>
          
          <div className="space-y-3 mb-6">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => handleEndpointSelect(endpoint)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedEndpoint.id === endpoint.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${endpoint.bgColor} mr-3`}>
                    <endpoint.icon className={`h-5 w-5 ${endpoint.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-900">{endpoint.name}</h5>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{endpoint.description}</p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{endpoint.path}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Auth Token Input */}
          {selectedEndpoint.requiresAuth && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authentication Token
              </label>
              <input
                type="text"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Enter JWT token (get from login endpoint)"
                className="form-input text-sm"
              />
            </div>
          )}

          {/* Request Body */}
          {selectedEndpoint.method === 'POST' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Body (JSON)
              </label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={8}
                className="form-input text-sm font-mono"
                placeholder="Enter JSON request body..."
              />
            </div>
          )}

          {/* Execute Button */}
          <button
            onClick={executeRequest}
            disabled={isLoading}
            className={`btn btn-primary w-full py-3 text-base font-medium ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Executing...
              </span>
            ) : (
              <span className="inline-flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Execute Request
              </span>
            )}
          </button>
        </div>

        {/* Right Panel - Response */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Response</h4>
          
          <div className="bg-gray-50 rounded-lg p-4 min-h-[400px]">
            {!response ? (
              <div className="text-center text-gray-500 mt-20">
                <Code className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select an endpoint and click "Execute Request" to see the response</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {response.success ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className={`font-medium ${
                      response.success ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {response.status ? `${response.status} ${response.statusText}` : 'Error'}
                    </span>
                  </div>
                  
                  {response.responseTime && (
                    <span className="text-sm text-gray-500">
                      {response.responseTime}ms
                    </span>
                  )}
                </div>

                {/* Response Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Body
                  </label>
                  <pre className="bg-white border border-gray-200 rounded-md p-4 text-sm font-mono overflow-x-auto max-h-80 overflow-y-auto">
                    {response.error 
                      ? response.error 
                      : JSON.stringify(response.data, null, 2)
                    }
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}