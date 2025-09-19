"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Left Background Image - Faded */}
          <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-10">
            <Image 
              src="/images/kiri.png" 
              alt="Left background" 
              width={400} 
              height={464} 
              className="opacity-50"
            />
          </div>
          
          {/* Right Background Image - Faded */}
          <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2 opacity-10">
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
          {/* Error Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="p-4 bg-red-100 rounded-full"
              >
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </motion.div>
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
              Something Went Wrong
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We encountered an unexpected error. Our team has been notified and is working to fix this issue.
            </p>
            
            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-100 rounded-lg p-4 mb-8 text-left max-w-2xl mx-auto">
                <h3 className="font-semibold text-gray-800 mb-2">Error Details:</h3>
                <p className="text-sm text-gray-600 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </motion.button>

            <a
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </a>
          </motion.div>

          {/* Support Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-sm text-gray-500"
          >
            <p>If this problem persists, please contact our support team.</p>
          </motion.div>
        </div>
      </body>
    </html>
  )
}