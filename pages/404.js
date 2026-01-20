import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'
import { getCanonicalUrl, URLS } from '../lib/urls'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found - eConnect</title>
        <meta name="description" content="The page you&apos;re looking for doesn&apos;t exist. Navigate back to eConnect." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={getCanonicalUrl('/404')} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="text-8xl md:text-9xl font-bold text-white/20 mb-4">
                404
              </div>
              <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card max-w-md mx-auto"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or the URL might be incorrect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={URLS.HOME} className="btn btn-primary flex items-center justify-center">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="btn btn-secondary flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Looking for something specific?
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href={URLS.HOME} className="text-primary-600 hover:text-primary-700 transition-colors">
                    • Homepage
                  </Link>
                  <Link href={URLS.DASHBOARD} className="text-primary-600 hover:text-primary-700 transition-colors">
                    • Dashboard
                  </Link>
                  <a href="mailto:support@econnect.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                    • Contact Support
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-white/80 text-sm mt-8"
            >
              Error Code: 404 | eConnect Education Platform
            </motion.p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}