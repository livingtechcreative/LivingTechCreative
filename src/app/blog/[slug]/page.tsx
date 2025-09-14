"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import Link from "next/link"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService, BlogPost } from "@/lib/api"
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
      duration: 0.6,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
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
  }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  },
  tap: {
    scale: 0.95
  }
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch current blog post by slug
        const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
        
        if (!slug) {
          setError("Invalid blog post URL")
          return
        }
        
        const currentBlogPost = await apiService.getBlogPostBySlug(slug)
        
        if (!currentBlogPost) {
          setError("Blog post not found or not available")
          return
        }
        
        // Fetch all blog posts for navigation data
        const allData = await apiService.getActiveBlogPosts()
        setAllBlogPosts(allData)
        
        setBlogPost(currentBlogPost)
        
        // Find current index for navigation
        const index = allData.findIndex(p => p.slug === slug)
        setCurrentIndex(index)
        
      } catch (error) {
        console.error('Failed to fetch blog post:', error)
        setError("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchBlogPost()
    }
  }, [params.slug])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevBlogPost = allBlogPosts[currentIndex - 1]
      router.push(`/blog/${prevBlogPost.slug}`)
    }
  }

  const handleNext = () => {
    if (currentIndex < allBlogPosts.length - 1) {
      const nextBlogPost = allBlogPosts[currentIndex + 1]
      router.push(`/blog/${nextBlogPost.slug}`)
    }
  }

  const handleGoToAllBlogs = () => {
    router.push('/blog')
  }

  const handleShare = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatReadTime = (minutes: number | null) => {
    if (!minutes) return "5 min read"
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
            <Button onClick={handleGoToAllBlogs}>
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Array.isArray(params.slug) ? params.slug.join('/') : params.slug}
        className="min-h-screen bg-white"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <IntegratedNavbar />
        
        {/* Header Section */}
        <motion.header 
          className="pt-24 pb-8 bg-gradient-to-br from-gray-50 to-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Navigation */}
            <motion.div 
              className="flex items-center justify-between mb-6"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleGoToAllBlogs}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </motion.button>
              
              <div className="flex items-center gap-2">
                {currentIndex > 0 && (
                  <motion.button
                    onClick={handlePrevious}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Previous
                  </motion.button>
                )}
                {currentIndex < allBlogPosts.length - 1 && (
                  <motion.button
                    onClick={handleNext}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Next
                  </motion.button>
                )}
              </div>
            </motion.div>
            
            <div className="text-center">
              {/* Meta Information */}
              <motion.div 
                className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blogPost.published_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadTime(blogPost.read_duration)}</span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {blogPost.title}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {blogPost.excerpt}
              </motion.p>

              {/* Share Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleShare}
                  variant="outline" 
                  size="sm" 
                  className="gap-2 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Cover Image */}
          <motion.section 
            className="mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="w-full max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-0">
                  <motion.div
                    className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Image
                      src={normalizeImagePath(blogPost.cover_image)}
                      alt={blogPost.title}
                      fill
                      className="object-cover"
                      unoptimized={normalizeImagePath(blogPost.cover_image).includes('livingtechcreative.com')}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          {/* Blog Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <motion.article 
              className="flex-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Introduction */}
              {blogPost.introduction && (
                <motion.section 
                  className="mb-8"
                  variants={itemVariants}
                >
                  <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-purple-500">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: blogPost.introduction }}
                    />
                  </div>
                </motion.section>
              )}

              {/* Main Content */}
              <motion.section 
                className="mb-8"
                variants={itemVariants}
              >
                <div 
                  className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </motion.section>

              {/* Conclusion */}
              {blogPost.conclution && (
                <motion.section 
                  className="mb-8"
                  variants={itemVariants}
                >
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Conclusion</h2>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: blogPost.conclution }}
                    />
                  </div>
                </motion.section>
              )}
            </motion.article>

            {/* Sidebar */}
            <motion.aside 
              className="lg:w-80"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Author Info */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="font-semibold text-gray-900 mb-3">About the Author</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {blogPost.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{blogPost.author}</p>
                    <p className="text-sm text-gray-600">Content Writer</p>
                  </div>
                </div>
              </motion.div>

              {/* Related Posts */}
              {allBlogPosts.length > 1 && (
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h3 className="font-semibold text-gray-900 mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {allBlogPosts
                      .filter(post => post.id !== blogPost.id)
                      .slice(0, 3)
                      .map((relatedPost) => (
                        <Link 
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={normalizeImagePath(relatedPost.cover_image)}
                                alt={relatedPost.title}
                                fill
                                className="object-cover"
                                unoptimized={normalizeImagePath(relatedPost.cover_image).includes('livingtechcreative.com')}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 text-sm">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(relatedPost.published_at)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link 
                      href="/blog"
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View all posts →
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.aside>
          </div>

          {/* Navigation Footer */}
          <motion.div 
            className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200"
            variants={itemVariants}
          >
            <div>
              {currentIndex > 0 && (
                <motion.button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Previous</div>
                    <div className="font-medium">{allBlogPosts[currentIndex - 1]?.title}</div>
                  </div>
                </motion.button>
              )}
            </div>
            <div>
              {currentIndex < allBlogPosts.length - 1 && (
                <motion.button
                  onClick={handleNext}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Next</div>
                    <div className="font-medium">{allBlogPosts[currentIndex + 1]?.title}</div>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
