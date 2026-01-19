export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are allowed for this endpoint'
    })
  }

  try {
    // Return health check response
    return res.status(200).json({
      status: 'OK',
      message: 'eConnect API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error) {
    console.error('Health check error:', error)
    return res.status(500).json({
      status: 'ERROR',
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    })
  }
}