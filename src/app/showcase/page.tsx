"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService, ShowcaseItem } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"

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

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
}

export default function ShowcasePage() {
  const [showcaseData, setShowcaseData] = useState<ShowcaseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch showcase data from external API
    const fetchShowcaseData = async () => {
      try {
        setLoading(true)
        const data = await apiService.getShowcaseItems()
        
        if (data && data.length > 0) {
          // Filter only active items and sort by display_order
          const activeItems = data
            .filter(item => item.is_active)
            .sort((a, b) => a.display_order - b.display_order)
          setShowcaseData(activeItems)
        } else {
          console.warn('No showcase data received from API')
          setShowcaseData([])
        }
      } catch (error) {
        console.error('Error fetching showcase data:', error)
        setShowcaseData([])
      } finally {
        setLoading(false)
      }
    }

    fetchShowcaseData()
  }, [])

  const handleGoToLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading showcase...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />
      
      <motion.main 
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Our <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">Showcase</span>
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Explore our latest projects and creative work. Each piece represents our commitment to excellence and innovation.
            </motion.p>
          </motion.div>

          {/* Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {showcaseData.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image - Full size */}
                <motion.div 
                  className="relative aspect-square overflow-hidden"
                  variants={imageVariants}
                >
                  <Image
                    src={normalizeImagePath(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                                     {/* Overlay with title */}
                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                     {/* Title appears on hover */}
                     <div className="opacity-0 group-hover:opacity-100 text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                       <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                       <motion.button
                         onClick={() => handleGoToLink(item.url)}
                         className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg mx-auto"
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                       >
                         <span>Go to Link</span>
                         <ExternalLink className="w-4 h-4" />
                       </motion.button>
                     </div>
                   </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {showcaseData.length === 0 && (
            <motion.div 
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No showcase items found</h3>
              <p className="text-gray-600">Check back later for our latest projects.</p>
            </motion.div>
          )}
        </div>
      </motion.main>

      <Footer />
    </div>
  )
}
