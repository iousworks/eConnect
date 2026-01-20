import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Shield, 
  Globe, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import AuthModal from '../components/AuthModal'
import ApiTester from '../components/ApiTester'
import Footer from '../components/Footer'
import { getCanonicalUrl, URLS } from '../lib/urls'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/health')
        if (response.ok) {
          setApiStatus('online')
        } else {
          setApiStatus('offline')
        }
      } catch (error) {
        setApiStatus('offline')
      }
    }

    checkApiStatus()
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Create, organize, and manage educational content with ease"
    },
    {
      icon: Users,
      title: "Student Portal",
      description: "Seamless student experience with progress tracking"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into learning patterns and performance"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security for your educational data"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access your educational platform from anywhere, anytime"
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Built-in tools to ensure high-quality educational delivery"
    }
  ]

  return (
    <>
      <Head>
        <title>eConnect - Modern Education Management Platform</title>
        <meta name="description" content="Streamline your educational institution with eConnect's comprehensive platform designed for the digital age. Features include user management, course creation, and real-time analytics." />
        <meta name="keywords" content="education management, learning platform, student portal, course management, educational software, online learning" />
        <meta name="author" content="eConnect Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="eConnect - Modern Education Management Platform" />
        <meta property="og:description" content="Streamline your educational institution with our comprehensive platform designed for the digital age." />
        <meta property="og:url" content={getCanonicalUrl('/')} />
        <meta property="og:site_name" content="eConnect" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="eConnect - Modern Education Management Platform" />
        <meta name="twitter:description" content="Streamline your educational institution with our comprehensive platform designed for the digital age." />
        <meta name="twitter:image" content="/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={getCanonicalUrl('/')} />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'eConnect',
              description: 'Modern Education Management Platform',
              url: getCanonicalUrl('/'),
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web Browser',
              author: {
                '@type': 'Organization',
                name: 'eConnect Team'
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            })
          }}
        />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.h1 
                className="text-2xl font-bold text-gradient"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                eConnect
              </motion.h1>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Features
                </a>
                <a href="/about" className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Contact
                </a>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn btn-primary ml-4"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#features" className="text-gray-700 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium">
                Features
              </a>
              <a href="/about" className="text-gray-700 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <button
                onClick={() => {
                  setIsAuthModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="btn btn-primary w-full mt-2"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card card-hover max-w-4xl mx-auto"
              >
                {/* API Status */}
                <div className="flex items-center justify-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    apiStatus === 'online' ? 'bg-green-500 animate-pulse-slow' : 
                    apiStatus === 'offline' ? 'bg-red-500' : 
                    'bg-yellow-500 animate-pulse'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    API Status: {apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Offline' : 'Checking...'}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                  Modern <span className="text-gradient">Education</span> Management
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Streamline your educational institution with our comprehensive platform designed for the digital age.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn btn-primary text-lg px-8 py-3 flex items-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => document.getElementById('api-tester').scrollIntoView({ behavior: 'smooth' })}
                    className="btn btn-secondary text-lg px-8 py-3"
                  >
                    Test API
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Everything you need to manage your educational platform effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card card-hover group"
                >
                  <div className="text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* API Tester Section */}
        <section id="api-tester" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                API Testing Interface
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Test our API endpoints directly from the browser
              </p>
            </motion.div>

            <ApiTester />
          </div>
        </section>
      </main>

      <Footer />

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  )
}