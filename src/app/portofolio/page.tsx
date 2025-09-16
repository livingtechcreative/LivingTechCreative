"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService, Portfolio } from "@/lib/api"
import { motion } from "framer-motion"
import { normalizeImagePath } from "@/lib/utils"

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await apiService.getPortfolios()
        const activePortfolios = data.filter(p => p.is_active)
        setPortfolios(activePortfolios)
      } catch (error) {
        console.error('Failed to fetch portfolios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-8 w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-64 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <IntegratedNavbar />
      
      {/* Main Content */}
      <main className="pt-32 relative">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Large Title Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <span>Discover</span>
                <div className="relative inline-block mx-1">
                  <Image
                    src="/images/liv.svg"
                    alt="Liv"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Our
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-2">
                <span>Recent</span>
                <div className="relative inline-block mx-1">
                  <Image
                    src="/images/project.svg"
                    alt="Project"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Projects
                </span>
              </div>
            </h2>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="group">
                {/* Project Image - Fixed Height */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                  <Image
                    src={normalizeImagePath(portfolio.cover_image)}
                    alt={portfolio.title}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={normalizeImagePath(portfolio.cover_image).includes('livingtechcreative.com')}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                    {portfolio.category}
                  </div>

                  {/* Hover Overlay with View Case Study Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Link 
                      href={`/portofolio/${portfolio.slug}`}
                      className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
                    >
                      View Case Study
                      <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Project Content - Transparent Card */}
                <div className="pt-4 pb-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {portfolio.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {portfolio.background}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {portfolio.category && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-default">
                        {portfolio.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Call to Action Banner */}
          <motion.section 
            className="mt-16 mb-8 -mx-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div
                className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat w-full"
                style={{
                  backgroundImage: "url('/images/bgbanner.png')",
                  minHeight: "200px",
                }}
              >
                <div className="relative px-12 py-8 text-left">
                  <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                    Time to Stop Scrolling,
                    <br />
                    Let&apos;s <Image src="/images/hand.svg" alt="Hand" width={32} height={32} className="w-8 h-8 inline-block" />{" "}
                    <span className="bg-gradient-to-r from-[#8A38F5] via-[#13CBD4] to-[#2B35AB] bg-clip-text text-transparent">
                      Book a meeting
                    </span>{" "}
                    and discuss it!
                  </h2>
                  <p className="text-white/90 text-base mb-6 max-w-xl">
                    We&apos;re here to listen. Book a meeting with our team to discuss your vision, explore possibilities, and
                    start creating something.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold w-full sm:w-auto flex items-center gap-2 justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Book a meeting
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold bg-black/30 w-full sm:w-auto flex items-center gap-2 justify-center"
                    >
                      Contact via WhatsApp →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  )
} 