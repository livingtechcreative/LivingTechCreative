    "use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Phone } from "lucide-react"
import Link from "next/link"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService, Portfolio } from "@/lib/api"
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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
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
      duration: 0.8
    }
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
}

export default function PortfolioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allPortfolios, setAllPortfolios] = useState<Portfolio[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch current portfolio by slug
        const currentPortfolio = await apiService.getPortfolioBySlug(params.slug as string)
        
        if (!currentPortfolio) {
          setError("Portfolio not found or not available")
          return
        }
        
        // Fetch all portfolios for navigation data
        const allData = await apiService.getPortfolios()
        const activePortfolios = allData.filter(p => p.is_active)
        setAllPortfolios(activePortfolios)
        
        setPortfolio(currentPortfolio)
        
        // Find current index for navigation
        const index = activePortfolios.findIndex(p => p.slug === params.slug)
        setCurrentIndex(index)
        
      } catch (error) {
        console.error('Failed to fetch portfolio:', error)
        setError("Failed to load portfolio")
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchPortfolio()
    }
  }, [params.slug])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevPortfolio = allPortfolios[currentIndex - 1]
      router.push(`/portofolio/${prevPortfolio.slug}`)
    }
  }

  const handleNext = () => {
    if (currentIndex < allPortfolios.length - 1) {
      const nextPortfolio = allPortfolios[currentIndex + 1]
      router.push(`/portofolio/${nextPortfolio.slug}`)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div 
              className="animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="pt-32 pb-16">
          <motion.div 
            className="max-w-4xl mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
            <p className="text-gray-600 mb-8">{error || "The portfolio you're looking for doesn't exist."}</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/portofolio">
                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  Back to All Portfolios
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-white"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <IntegratedNavbar />
        
        {/* Header */}
        <motion.header 
          className="bg-white pt-20 sm:pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <motion.div 
              className="flex items-start"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/portofolio">
                  <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4" />
                    Return
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center mt-6 sm:mt-8 mb-6"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {portfolio.title}
              </motion.h1>
              {portfolio.project_url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <ExternalLink className="w-4 h-4" />
                    <a href={portfolio.project_url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <motion.section 
            className="mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-0">
                  {portfolio.cover_image && (
                    <motion.div
                      className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden"
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Image
                        src={normalizeImagePath(portfolio.cover_image)}
                        alt={portfolio.title}
                        fill
                        className="object-cover"
                        unoptimized={normalizeImagePath(portfolio.cover_image).includes('livingtechcreative.com')}
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content - Left Side */}
            <motion.div 
              className="flex-1 max-w-7xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Background Section */}
              <motion.section 
                id="background" 
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Background
                </motion.h2>
                <motion.div 
                  className="prose prose-gray max-w-none"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.background}
                  </p>
                </motion.div>
              </motion.section>

              <motion.section 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 sm:p-0"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Client</h4>
                  <p className="text-sm text-gray-700">{portfolio.client}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 sm:p-0"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Industry</h4>
                  <p className="text-sm text-gray-700">{portfolio.category}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 sm:p-0"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Timeline</h4>
                  <p className="text-sm text-gray-700">
                    {formatDate(portfolio.start_date)} - {formatDate(portfolio.end_date)}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 sm:p-0"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Duration</h4>
                  <p className="text-sm text-gray-700">{portfolio.duration_days} days</p>
                </motion.div>
              </motion.section>

              <motion.section 
                id="problem" 
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Problem
                </motion.h2>
                <motion.div 
                  className="prose prose-gray max-w-none"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.problem}
                  </p>
                </motion.div>
              </motion.section>

              <motion.section 
                id="goal" 
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Goal
                </motion.h2>
                <motion.div 
                  className="prose prose-gray max-w-none"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.goal}
                  </p>
                </motion.div>
              </motion.section>

              <motion.section 
                id="solution" 
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Solution
                </motion.h2>

                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="space-y-3 p-3 sm:p-0"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">User-Centered Design</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Implemented intuitive user interfaces and seamless user experiences that prioritize user needs and goals.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="space-y-3 p-3 sm:p-0"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Modern Technology Stack</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Utilized cutting-edge technologies and frameworks to ensure scalability, performance, and maintainability.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="space-y-3 p-3 sm:p-0"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Responsive Architecture</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Built flexible and adaptive systems that work seamlessly across all devices and platforms.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="space-y-3 p-3 sm:p-0"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Performance Optimization</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Optimized for speed and efficiency, ensuring fast loading times and smooth user interactions.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.section>

              <motion.section 
                id="conclusion" 
                className="mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Conclusion
                </motion.h2>
                <motion.div 
                  className="prose prose-gray max-w-none"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.conclution}
                  </p>
                </motion.div>
              </motion.section>

              <motion.div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 sm:pt-8 border-t border-gray-200"
                variants={itemVariants}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-start"
                    onClick={handlePrevious}
                    disabled={currentIndex <= 0}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="truncate">
                      {currentIndex > 0 ? allPortfolios[currentIndex - 1].title : 'Previous Project'}
                    </span>
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-end"
                    onClick={handleNext}
                    disabled={currentIndex >= allPortfolios.length - 1}
                  >
                    <span className="truncate">
                      {currentIndex < allPortfolios.length - 1 ? allPortfolios[currentIndex + 1].title : 'Next Project'}
                    </span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hidden md:block w-56 flex-shrink-0"
              variants={itemVariants}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="sticky top-32">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Table of Content</h3>
                <nav className="space-y-2">
                  {[
                    { href: "#background", label: "Background" },
                    { href: "#problem", label: "Problem" },
                    { href: "#goal", label: "Goal" },
                    { href: "#solution", label: "Solution" },
                    { href: "#conclusion", label: "Conclusion" }
                  ].map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>

          <motion.section 
            className="mt-12 sm:mt-16 mb-6 sm:mb-8 -mx-4 sm:-mx-6"
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat w-full"
                style={{
                  backgroundImage: "url('/images/bgbanner.png')",
                  minHeight: "180px",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative px-6 sm:px-12 py-6 sm:py-8 text-left">
                  <motion.h2 
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Time to Stop Scrolling,
                    <br />
                    Let&apos;s <Image src="/images/hand.svg" alt="Hand" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8 inline-block" />{" "}
                    <span className="bg-gradient-to-r from-[#8A38F5] via-[#13CBD4] to-[#2B35AB] bg-clip-text text-transparent">
                      Book a meeting
                    </span>{" "}
                    and discuss it!
                  </motion.h2>
                  <motion.p 
                    className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    We&apos;re here to listen. Book a meeting with our team to discuss your vision, explore possibilities, and
                    start creating something.
                  </motion.p>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-lg font-semibold w-full sm:w-auto flex items-center gap-2 justify-center"
                      >
                        <Phone className="w-5 h-5" />
                        Book a meeting
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 rounded-lg font-semibold bg-black/30 w-full sm:w-auto flex items-center gap-2 justify-center"
                      >
                        Contact via WhatsApp →
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
