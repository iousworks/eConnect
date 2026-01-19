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
  X,
  GraduationCap,
  ClipboardList,
  Settings,
  Send,
  Database,
  Home as HomeIcon
} from 'lucide-react'
import AuthModal from '../components/AuthModal'
import ApiTester from '../components/ApiTester'
import { getCanonicalUrl, URLS } from '../lib/urls'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sidebarItems = [
    { icon: HomeIcon, label: 'Dashboard', active: false },
    { icon: BookOpen, label: 'Courses', active: true },
    { icon: ClipboardList, label: 'Course Review', active: false },
    { icon: Settings, label: 'Functions', active: false },
    { icon: Send, label: 'Send Grades', active: false },
    { icon: Database, label: 'Data Send', active: false }
  ]

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
      title: "Namnollo",
      description: "Curent docx tempor",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Floorbois",
      description: "Lorem ipsum adipisci",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Mowash In dloxayt",
      description: "Lorem tempor aliquat",
      color: "text-purple-500"
    },
    {
      icon: CheckCircle2,
      title: "Postalo",
      description: "Lorem ipsum adipisci",
      color: "text-purple-500"
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

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <motion.h1 
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  🔗 eConnect
                </motion.h1>
              </div>
              <div className="mt-8 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.label}
                        href="#"
                        className={`${
                          item.active
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                      >
                        <Icon
                          className={`${
                            item.active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                          } mr-3 flex-shrink-0 h-6 w-6`}
                          aria-hidden="true"
                        />
                        {item.label}
                      </a>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top navigation */}
          <nav className="bg-white border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </button>
                  <h1 className="ml-2 text-xl font-bold text-gray-900">eConnect</h1>
                </div>
                <div className="hidden lg:flex lg:items-center lg:space-x-8">
                  <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Groups ▼
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Promedios ▼
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Funciones ▼
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                    Servicios ▼
                  </a>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile sidebar */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="fixed inset-0 z-40 flex">
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-900">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <h1 className="text-xl font-bold text-white">🔗 eConnect</h1>
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                      {sidebarItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <a
                            key={item.label}
                            href="#"
                            className={`${
                              item.active
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                          >
                            <Icon
                              className={`${
                                item.active ? 'text-white' : 'text-gray-400 group-hover:text-white'
                              } mr-4 flex-shrink-0 h-6 w-6`}
                              aria-hidden="true"
                            />
                            {item.label}
                          </a>
                        )
                      })}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 overflow-hidden">
              {/* Floating elements */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-60 right-40 w-5 h-5 bg-white/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-60 right-10 w-4 h-4 bg-white/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
              </div>
              
              <div className="relative px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-left"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      Modern Education<br />Management
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                      Lorem ipsum dolor sit amet consectetur adipisic tempor incididunt ut labore et dolore magna.
                    </p>
                    
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Wave separator */}
              <div className="relative">
                <svg className="absolute bottom-0 left-0 w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
                </svg>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Sect Docs 2
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`${feature.color} p-3 rounded-lg bg-gray-50`}>
                            <feature.icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* API Tester Section */}
            <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    API Testing Interface
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Test our API endpoints directly from the browser
                  </p>
                </motion.div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <ApiTester />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  )
}