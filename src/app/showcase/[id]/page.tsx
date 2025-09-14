"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService, ShowcaseItem } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

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

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
}

const buttonVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
}



export default function ShowcaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showcaseItem, setShowcaseItem] = useState<ShowcaseItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShowcaseItem = async () => {
      try {
        const id = parseInt(params.id as string)
        
        if (isNaN(id)) {
          setError("Invalid showcase ID")
          setLoading(false)
          return
        }
        
        setLoading(true)
        const data = await apiService.getShowcaseItem(id)
        
        if (data) {
          setShowcaseItem(data)
        } else {
          console.warn('No showcase item received from API')
          setError("Showcase item not found")
        }
      } catch (error) {
        console.error('Error fetching showcase item:', error)
        setError("Failed to load showcase item")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchShowcaseItem()
    }
  }, [params.id])

  const handleGoToLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleBack = () => {
    router.push('/showcase')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading showcase item...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !showcaseItem) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error || "Showcase item not found"}</p>
            <motion.button
              onClick={handleBack}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Showcase
            </motion.button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-white"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <IntegratedNavbar />
        
        <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Showcase
              </motion.button>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image Section */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl shadow-lg"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <Image
                    src={normalizeImagePath(showcaseItem.image)}
                    alt={showcaseItem.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    unoptimized={normalizeImagePath(showcaseItem.image).includes('livingtechcreative.com')}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => handleGoToLink(showcaseItem.url)}
                      className="opacity-0 hover:opacity-100 bg-white text-gray-900 px-8 py-4 rounded-lg font-medium flex items-center gap-3 shadow-lg transform translate-y-4 hover:translate-y-0 transition-all duration-300"
                      variants={buttonVariants}
                      whileHover="hover"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                className="space-y-8"
                variants={containerVariants}
              >
                <motion.div 
                  className="space-y-4"
                  variants={itemVariants}
                >
                  <motion.h1 
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                    variants={itemVariants}
                  >
                    {showcaseItem.title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-gray-600 text-lg leading-relaxed"
                    variants={itemVariants}
                  >
                    This project showcases our expertise in creating innovative digital solutions. 
                    We combine cutting-edge technology with creative design to deliver exceptional 
                    user experiences that drive results.
                  </motion.p>
                </motion.div>

                {/* Project Details */}
                <motion.div 
                  className="space-y-6"
                  variants={itemVariants}
                >
                  <motion.h3 
                    className="text-xl font-semibold text-gray-900"
                    variants={itemVariants}
                  >
                    Project Details
                  </motion.h3>
                  
                  <motion.div 
                    className="grid sm:grid-cols-2 gap-6"
                    variants={containerVariants}
                  >
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      variants={itemVariants}
                    >
                      <Calendar className="w-5 h-5 text-[#2B35AB]" />
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-900">{formatDate(showcaseItem.created_at)}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      variants={itemVariants}
                    >
                      <Clock className="w-5 h-5 text-[#2B35AB]" />
                      <div>
                        <p className="text-sm text-gray-500">Updated</p>
                        <p className="font-medium text-gray-900">{formatDate(showcaseItem.updated_at)}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      variants={itemVariants}
                    >
                      <div className="w-5 h-5 bg-[#2B35AB] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">#</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Display Order</p>
                        <p className="font-medium text-gray-900">{showcaseItem.display_order}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      variants={itemVariants}
                    >
                      <div className={`w-3 h-3 rounded-full ${showcaseItem.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">
                          {showcaseItem.is_active ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={() => handleGoToLink(showcaseItem.url)}
                    className="flex-1 bg-[#2B35AB] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#1f2a8a] transition-colors duration-200 flex items-center justify-center gap-3"
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    Back to Showcase
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
