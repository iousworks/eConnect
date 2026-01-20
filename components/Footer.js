import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Github,
  Linkedin,
  Instagram,
  Mail
} from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/iousworks',
      color: 'text-gray-700 hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/jennysubrastas-823017225',
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/____ious/',
      color: 'text-blue-400 hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:jennysubrastas25@gmail.com',
      color: 'text-red-500 hover:text-red-600'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gradient mb-4">eConnect</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming education through modern technology. Built with passion to connect 
                students, educators, and institutions in meaningful ways.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/?auth=login" className="text-gray-300 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/?auth=register" className="text-gray-300 hover:text-white transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:jennysubrastas25@gmail.com" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    jennysubrastas25@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/iousworks" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/jennysubrastas-823017225" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2022 eConnect. Built with ❤️ by Jenny M. Subrastas. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-400">
                Made with Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}