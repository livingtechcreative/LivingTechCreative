"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { apiService, Portfolio } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"

export default function HeroMarqueeSection() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true)
        const data = await apiService.getPortfolios()
        // Show active portfolios, prioritize featured ones first, then show up to 6 projects for marquee
        const activePortfolios = data.filter(portfolio => portfolio.is_active)
        const featuredFirst = activePortfolios.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          return 0
        })
        setPortfolios(featuredFirst.slice(0, 6)) // Show up to 6 portfolios for marquee
      } catch (error) {
        console.error('Failed to fetch portfolios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  // Show loading state or fallback if no portfolios
  if (loading || portfolios.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="w-full overflow-hidden bg-gray-50 mt-32"
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading portfolio...</div>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="w-full overflow-hidden bg-gray-50 mt-32"
    >
      <div className="relative">
        {/* Gradient overlays for fade effect - positioned at screen edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

        {/* Marquee container */}
        <div className="flex">
          {/* First set of cards */}
          <motion.div
            className="flex"
            animate={{
              x: [0, -100 * portfolios.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {portfolios.map((portfolio, index) => (
              <Link 
                key={`first-${index}`}
                href={`/portofolio/${portfolio.slug}`}
                className="flex-shrink-0 w-80 h-48 sm:w-96 sm:h-56 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80 rounded-2xl mx-4 overflow-hidden border-2 border-black/20 hover:border-black/40 transition-all duration-300 group relative cursor-pointer"
              >
                <Image
                  src={normalizeImagePath(portfolio.cover_image) || "/placeholder.svg"}
                  alt={portfolio.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized={normalizeImagePath(portfolio.cover_image)?.includes('livingtechcreative.com')}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                  {portfolio.category}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {portfolio.title}
                  </h3>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Second set of cards for seamless loop */}
          <motion.div
            className="flex"
            animate={{
              x: [0, -100 * portfolios.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {portfolios.map((portfolio, index) => (
              <Link 
                key={`second-${index}`}
                href={`/portofolio/${portfolio.slug}`}
                className="flex-shrink-0 w-80 h-48 sm:w-96 sm:h-56 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80 rounded-2xl mx-4 overflow-hidden border-2 border-black/20 hover:border-black/40 transition-all duration-300 group relative cursor-pointer"
              >
                <Image
                  src={normalizeImagePath(portfolio.cover_image) || "/placeholder.svg"}
                  alt={portfolio.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized={normalizeImagePath(portfolio.cover_image)?.includes('livingtechcreative.com')}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                  {portfolio.category}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {portfolio.title}
                  </h3>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}