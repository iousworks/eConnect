import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart,
  Coffee,
  Code,
  Rocket,
  GraduationCap,
  Calendar,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import Footer from '../components/Footer'
import { getCanonicalUrl } from '../lib/urls'

export default function About() {
  const [isHovered, setIsHovered] = useState(null)

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/iousworks', // Replace with your actual GitHub
      color: 'text-gray-700 hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/jennysubrastas-823017225', // Clean LinkedIn URL
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/____ious/', // Replace with your actual Twitter
      color: 'text-blue-400 hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:jennysubrastas25@gmail.com', // Replace with your actual email
      color: 'text-red-500 hover:text-red-600'
    }
  ]

  const timeline = [
    {
      year: 'College Days',
      title: 'The Spark',
      description: 'Started as a college project with big dreams and endless curiosity about connecting people through education.'
    },
    {
      year: 'Learning Phase',
      title: 'Building Skills',
      description: 'Dove deep into web development, learning JavaScript, React, and the art of creating meaningful user experiences.'
    },
    {
      year: 'Today',
      title: 'Vision Realized',
      description: 'Bringing eConnect to life - a platform that bridges the gap between traditional education and modern technology.'
    }
  ]

  return (
    <>
      <Head>
        <title>About - eConnect | The Story Behind the Platform</title>
        <meta name="description" content="Learn about the journey of eConnect - from a college project to a modern education management platform. Built with passion and dedication to transform educational experiences." />
        <meta name="keywords" content="about eConnect, education platform story, college project, developer journey, educational technology" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About - eConnect | The Story Behind the Platform" />
        <meta property="og:description" content="Learn about the journey of eConnect - from a college project to a modern education management platform." />
        <meta property="og:url" content={getCanonicalUrl('/about')} />
        <meta property="og:site_name" content="eConnect" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About - eConnect | The Story Behind the Platform" />
        <meta name="twitter:description" content="Learn about the journey of eConnect - from a college project to a modern education management platform." />
        
        {/* Canonical URL */}
        <link rel="canonical" href={getCanonicalUrl('/about')} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <motion.h1 
                  className="text-2xl font-bold text-gradient cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  eConnect
                </motion.h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-700 hover:text-primary-500 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-8">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                    <Heart className="w-4 h-4 mr-2" />
                    Made with passion
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                  The <span className="text-gradient">Journey</span> Behind eConnect
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  From a college dream to reality - this is the story of how a simple idea grew into a platform that connects people through education.
                </p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
                >
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Started in College</span>
                  </div>
                  <div className="flex items-center">
                    <Code className="w-4 h-4 mr-1" />
                    <span>Built with Modern Tech</span>
                  </div>
                  <div className="flex items-center">
                    <Rocket className="w-4 h-4 mr-1" />
                    <span>Launched with Purpose</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card card-hover mb-16"
            >
              <div className="flex items-center mb-6">
                <GraduationCap className="w-8 h-8 text-primary-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">The College Days</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  It all started during my college years when I was fascinated by the potential of technology to transform education. 
                  I remember sitting in lectures, taking notes on paper, and thinking there had to be a better way to connect students, 
                  teachers, and educational content.
                </p>
                <p className="mb-6">
                  <strong>eConnect was born from a simple observation:</strong> education was becoming digital, but the tools were still fragmented. 
                  Students used one platform for assignments, another for communication, and yet another for grades. 
                  I envisioned a unified platform that could bring everything together seamlessly.
                </p>
                <p>
                  What started as a final project became a passion. Late nights in the computer lab, endless cups of coffee ☕, 
                  and countless iterations later, the foundation of eConnect was laid. But like many college projects, 
                  it remained just that - a project with potential.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card card-hover mb-16"
            >
              <div className="flex items-center mb-6">
                <Rocket className="w-8 h-8 text-secondary-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Bringing the Vision to Life</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  Years passed, technology evolved, and the need for better educational platforms became even more apparent. 
                  The pandemic showed us how crucial digital learning tools really are. It was then that I decided to dust off 
                  my old college project and rebuild it from the ground up.
                </p>
                <p className="mb-6">
                  This time, I had the experience, the tools, and most importantly, a clearer understanding of what educators 
                  and students actually need. Using modern technologies like React, Next.js, and MongoDB, I rebuilt eConnect 
                  as a comprehensive education management platform.
                </p>
                <p>
                  <strong>Today, eConnect is more than just a platform - it's a testament to the power of perseverance and the belief 
                  that technology can make education more accessible, engaging, and effective for everyone.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">The Journey</h2>
              <p className="text-xl text-gray-600">Key milestones in the eConnect story</p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className="card card-hover">
                      <span className="text-primary-600 font-semibold">{item.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Built By Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card card-hover"
            >
              <div className="mb-8">
                <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-4 border-gradient-to-r from-primary-500 to-secondary-500">
                  <img 
                    src="/profilepic.png" // Replace with your actual profile picture
                    alt="Jenny M. Subrastas Profile Picture" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with ❤️ by</h2>
                <h3 className="text-4xl font-bold text-gradient mb-2">Jenny M. Subrastas</h3>
                {/* Replace "Your Name" with your actual name */}
                <p className="text-xl text-gray-600 mb-6">Full-Stack Developer & Education Enthusiast</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4">
                    <Coffee className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Coffee Driven</span>
                  </div>
                  <div className="text-center p-4">
                    <Code className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Code Passionate</span>
                  </div>
                  <div className="text-center p-4">
                    <GraduationCap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Education Focused</span>
                  </div>
                  <div className="text-center p-4">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">User Centric</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full transition-all duration-200 ${link.color} hover:scale-110 hover:shadow-lg`}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-6 h-6" />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <p className="text-gray-600 mb-4">
                  Want to connect or collaborate? I'm always excited to discuss education technology, 
                  web development, or any interesting projects!
                </p>
                <a
                  href="mailto:jennysubrastas25@gmail.com" // Replace with your actual email
                  className="btn btn-primary inline-flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
              <p className="text-xl text-gray-600">eConnect is powered by cutting-edge tools and technologies</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Next.js', color: 'bg-black text-white' },
                { name: 'React', color: 'bg-blue-500 text-white' },
                { name: 'MongoDB', color: 'bg-green-500 text-white' },
                { name: 'Tailwind CSS', color: 'bg-blue-400 text-white' },
                { name: 'Framer Motion', color: 'bg-purple-500 text-white' },
                { name: 'Node.js', color: 'bg-green-600 text-white' },
                { name: 'Vercel', color: 'bg-black text-white' },
                { name: 'JavaScript', color: 'bg-yellow-500 text-black' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${tech.color} p-4 rounded-lg text-center font-semibold transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Experience eConnect?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join the future of education management and see how eConnect can transform your learning experience.
              </p>
              <Link href="/" className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
                Explore the Platform
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}