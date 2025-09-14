"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService, BlogPost } from "@/lib/api"
import { motion } from "framer-motion"
import { normalizeImagePath } from "@/lib/utils"
import { Calendar, Clock, User } from "lucide-react"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        const data = await apiService.getActiveBlogPosts()
        setBlogPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  useEffect(() => {
    const filtered = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchTerm, blogPosts])

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
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our Blog
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Insights, tutorials, and stories from our team. Stay updated with the latest trends in technology and design.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600">
              {searchTerm ? (
                <>Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchTerm}"</>
              ) : (
                <>Showing {filteredPosts.length} blog post{filteredPosts.length !== 1 ? 's' : ''}</>
              )}
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredPosts.map((post) => (
              <motion.article 
                key={post.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Blog Post Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={normalizeImagePath(post.cover_image)}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={normalizeImagePath(post.cover_image).includes('livingtechcreative.com')}
                  />
                  
                  {/* Overlay with Read More Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Blog Post Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatReadTime(post.read_duration)}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && !loading && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? "Try adjusting your search terms or browse all posts."
                    : "Check back later for new content!"
                  }
                </p>
                {searchTerm && (
                  <Button 
                    onClick={() => setSearchTerm("")}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Call to Action Banner */}
          <motion.section 
            className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to stay updated?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest insights and updates delivered directly to your inbox.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
