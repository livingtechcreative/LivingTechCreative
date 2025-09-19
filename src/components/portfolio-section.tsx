"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import BadgeSubtitle from "./badge-subtitle"
import Link from "next/link"
import { apiService, Portfolio } from "@/lib/api"
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
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.3
    }
  }
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1.1 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.3
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
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
}

export default function PortfolioSection() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPortfolios = async () => {
    try {
      setLoading(true)
      const data = await apiService.getPortfolios()
      // Show all active portfolios, prioritize featured ones first, then show up to 6 projects
      const activePortfolios = data.filter(portfolio => portfolio.is_active)
      const featuredFirst = activePortfolios.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1
        if (!a.is_featured && b.is_featured) return 1
        return 0
      })
      setPortfolios(featuredFirst.slice(0, 6)) // Show up to 6 portfolios
    } catch (error) {
      console.error('Failed to fetch portfolios:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPortfolios()
  }, [])

  // Handle hash navigation - refetch data when component becomes visible
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#portfolio' || hash === '#portofolio') {
        // Small delay to ensure component is visible
        setTimeout(() => {
          if (portfolios.length === 0 && !loading) {
            fetchPortfolios()
          }
        }, 100)
      }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    // Check initial hash
    handleHashChange()

    // Also check when component mounts if we're already on the hash
    if (typeof window !== 'undefined') {
      const currentHash = window.location.hash
      if (currentHash === '#portfolio' || currentHash === '#portofolio') {
        setTimeout(() => {
          if (portfolios.length === 0 && !loading) {
            fetchPortfolios()
          }
        }, 500)
      }
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [portfolios.length, loading])

  const projects = portfolios.map(portfolio => ({
    id: portfolio.id,
    slug: portfolio.slug,
    title: portfolio.title,
    description: portfolio.background,
    category: portfolio.category,
    tags: [] as string[],
    image: normalizeImagePath(portfolio.cover_image),
    filterCategory: portfolio.category,
    imageHeight: "h-80",
  }))

  const filteredProjects = projects

  return (
    <motion.section 
      id="portofolio" 
      className="bg-white py-32 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4"
            variants={textVariants}
          >
            <BadgeSubtitle>Portfolio</BadgeSubtitle>
          </motion.div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              variants={textVariants}
            >
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span>Discover</span>
                <motion.div 
                  className="relative inline-block mx-1"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Image
                    src="/images/liv.svg"
                    alt="Liv"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </motion.div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Our
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                <span>Recent</span>
                <motion.div 
                  className="relative inline-block mx-1"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Image
                    src="/images/project.svg"
                    alt="Project"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </motion.div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Projects
                </span>
              </div>
            </motion.h2>
            <motion.div
              variants={textVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/portofolio" className="flex items-center gap-2 text-gray-800 hover:text-purple-600 font-medium transition-colors group">
                View all portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Masonry Grid */}
        {loading ? (
          <motion.div 
            className="columns-1 md:columns-2 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i} 
                className="break-inside-avoid mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-80 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-500 text-lg mb-2">No portfolios available</div>
            <p className="text-gray-400">Portfolio data will appear here once available</p>
          </motion.div>
        ) : (
          <motion.div 
            className="columns-1 md:columns-2 gap-6 space-y-6"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="break-inside-avoid mb-6"
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Project Image - Clickable Card */}
                <Link href={`/portofolio/${project.slug}`}>
                  <motion.div
                    className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${project.imageHeight}`}
                    variants={imageVariants}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={project.image?.includes('livingtechcreative.com')}
                    />

                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {project.category}
                    </motion.div>

                    {/* Title Overlay - Hidden by default, shown on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
