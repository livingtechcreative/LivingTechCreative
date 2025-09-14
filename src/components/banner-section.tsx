"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -10
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5
    }
  }
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    x: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function BannerSection() {
  return (
    <motion.section 
      id="banner" 
      className="bg-white py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100"
          variants={cardVariants}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                  variants={textVariants}
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden flex flex-wrap items-center gap-3 md:gap-4">
                    <span>We Teach</span>
                    <motion.div 
                      className="relative inline-block mx-1"
                      variants={iconVariants}
                    >
                      <Image 
                        src="/images/books.svg" 
                        alt="Books" 
                        width={56}
                        height={56}
                        className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14" 
                      />
                    </motion.div>
                    <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">Something</span>
                  </div>
                  <div className="lg:hidden flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                    <span className="text-gray-900">Too...</span>
                  </div>
                  {/* Desktop Layout - Icon and Something Too in new line */}
                  <div className="hidden lg:block">
                    <div className="flex items-center gap-3 mt-2">
                      <span>We Teach</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <motion.div 
                        className="relative inline-block"
                        variants={iconVariants}
                      >
                        <Image 
                          src="/images/books.svg" 
                          alt="Books" 
                          width={56}
                          height={56}
                          className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14" 
                        />
                      </motion.div>
                      <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">Something</span>
                      <span className="text-gray-900">Too...</span>
                    </div>
                  </div>
                </motion.h2>
              </motion.div>

              <motion.p 
                className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md"
                variants={textVariants}
              >
                Explore our diverse courses that inspire you growth and joy. Discover our offerings and find the course
                that relates to you!
              </motion.p>

              <motion.button 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See our course
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Right Illustration */}
            <motion.div 
              className="hidden lg:flex justify-center lg:justify-end"
              variants={itemVariants}
            >
              <motion.div 
                className="relative"
                variants={imageVariants}
              >
                <Image src="/images/illustration.svg" alt="Learning illustration" width={400} height={300} className="w-full max-w-md h-auto" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
