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
import CTABanner from "@/components/cta-banner"

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
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />
      
      <main className="pt-32 pb-16">
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
                <>Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for &quot;{searchTerm}&quot;</>
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
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Blog Post Image */}
                <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-50 to-indigo-50">
                  <Image
                    src={normalizeImagePath(post.cover_image)}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="w-full h-64 object-cover"
                    unoptimized={normalizeImagePath(post.cover_image).includes('livingtechcreative.com')}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      {post.category || 'Article'}
                    </span>
                  </div>

                  {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatReadTime(post.read_duration)}
                    </span>
                  </div>

                  </div>

                {/* Blog Post Content */}
                <div className="p-6">
                  {/* Author and Date */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{formatDate(post.published_at)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    <span>Read Article</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
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
          <CTABanner className="mt-16 mb-8 -mx-4 sm:-mx-6 lg:-mx-8" />
        </div>
      </main>

    </div>
  )
}
