"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Left Background Image - Faded */}
        <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-20">
          <Image 
            src="/images/kiri.png" 
            alt="Left background" 
            width={400} 
            height={464} 
            className="opacity-50"
          />
        </div>
        
        {/* Right Background Image - Faded */}
        <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2 opacity-20">
          <Image 
            src="/images/kanan.png" 
            alt="Right background" 
            width={400} 
            height={517} 
            className="opacity-50"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-gray-200 leading-none">
            404
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best developers get lost sometimes!
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="hero-icon"
            >
              <Image
                src="/images/ghost.svg"
                alt="Lost Ghost"
                width={80}
                height={80}
                className="object-contain"
                unoptimized={true}
              />
            </motion.div>
            <div className="text-4xl sm:text-5xl">👻</div>
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Search className="w-12 h-12 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>Lost? Don't worry, we'll help you find your way back to amazing digital experiences!</p>
        </motion.div>
      </div>
    </div>
  )
}