"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Portfolio } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"

// BadgeSubtitle component definition (in case it's missing)
function BadgeSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
      {children}
    </span>
  )
}

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
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    scale: 1,
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

export default function PortfolioSection({ portfolios = [] }: { portfolios: Portfolio[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  // Mock data for demonstration
  const projects = [
    {
      id: '1',
      title: 'E-commerce Website',
      description: 'A modern e-commerce platform with seamless checkout experience',
      category: 'Web Development',
      image: '/images/project1.jpg',
      link: '/portfolio/ecommerce',
      imageHeight: 'h-80',
    },
    {
      id: '2',
      title: 'Mobile App Design',
      description: 'UI/UX design for a fitness tracking mobile application',
      category: 'UI/UX Design',
      image: '/images/project2.jpg',
      link: '/portfolio/mobile-app',
      imageHeight: 'h-96',
    },
    {
      id: '3',
      title: 'Brand Identity',
      description: 'Complete brand identity design for a startup company',
      category: 'Branding',
      image: '/images/project3.jpg',
      link: '/portfolio/brand-identity',
      imageHeight: 'h-80',
    },
    {
      id: '4',
      title: 'Web Application',
      description: 'Enterprise web application with advanced analytics',
      category: 'Web Development',
      image: '/images/project4.jpg',
      link: '/portfolio/web-app',
      imageHeight: 'h-96',
    },
    {
      id: '5',
      title: 'Marketing Campaign',
      description: 'Digital marketing campaign for product launch',
      category: 'Marketing',
      image: '/images/project5.jpg',
      link: '/portfolio/marketing',
      imageHeight: 'h-80',
    },
    {
      id: '6',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile application development',
      category: 'Mobile',
      image: '/images/project6.jpg',
      link: '/portfolio/mobile-dev',
      imageHeight: 'h-96',
    },
  ].map(project => ({
    ...project,
    image: normalizeImagePath(project.image),
    imageHeight: project.imageHeight || 'h-80',
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
                    className="w-14 h-14 object-contain"
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
                    className="w-14 h-14 object-contain"
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="columns-1 md:columns-2 gap-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                className="break-inside-avoid mb-6 group"
                variants={cardVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={project.link} className="block">
                  <motion.div 
                    className={`relative rounded-2xl overflow-hidden ${project.imageHeight} w-full`}
                    variants={imageVariants}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-contain"
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
