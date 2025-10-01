import { notFound } from "next/navigation"
import Image from "next/image"
import ShareButton from "@/components/blog/share-button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import blogPosts from "@/data/blog-posts.json"

import blogSlugs from '@/data/blog-slugs.json'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    console.log('[build] generateStaticParams(blog/page) called')
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dashboard.livingtechcreative.com/api'
    const baseUrl = base.endsWith('/') ? base : base + '/'
    const url = new URL('blog-posts', baseUrl).toString()
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) throw new Error(`Failed ${res.status}`)
    const data = await res.json()
    const posts = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
    const slugs = posts.filter((p: any) => p?.is_active && typeof p.slug === 'string').map((p: any) => p.slug)
    const mapped = slugs.map((slug: string) => ({ slug }))
    if (mapped.length === 0) {
      console.log('[build] generateStaticParams(blog/page) no API slugs, using mock fallback')
      return [{ slug: 'placeholder' }]
    }
    return mapped
  } catch (e) {
    console.log('[build] generateStaticParams(blog/page) falling back to local json')
    const mapped = (blogSlugs as string[]).map((slug) => ({ slug }))
    if (mapped.length === 0) {
      console.log('[build] generateStaticParams(blog/page) local json empty, using mock fallback')
      return [{ slug: 'placeholder' }]
    }
    return mapped
  }
}
// CRITICAL: These settings are required for static export
export const dynamicParams = false  // MUST be false for static export
  export const dynamic = 'force-static'
  
  export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    
    try {
    let allBlogPosts = (blogPosts as any[]).filter((p) => p?.is_active)
    let blogPost = allBlogPosts.find(p => p.slug === slug)
    let currentIndex = allBlogPosts.findIndex(p => p.slug === slug)
    // Fallback to live API if not found in local data
    if (!blogPost) {
      const livePosts = await apiService.getBlogPosts()
      const activeLivePosts = (livePosts || []).filter((p) => p?.is_active)
      const liveMatch = activeLivePosts.find(p => p.slug === slug)
      if (liveMatch) {
        allBlogPosts = activeLivePosts
        blogPost = liveMatch
        currentIndex = allBlogPosts.findIndex(p => p.slug === slug)
      }
    }
    const previous = currentIndex > 0 ? allBlogPosts[currentIndex - 1] : null
    const next = currentIndex < allBlogPosts.length - 1 ? allBlogPosts[currentIndex + 1] : null

    const handleShare = async () => {
      if (navigator.share && blogPost) {
        try {
          await navigator.share({
            title: blogPost.title,
            text: blogPost.excerpt,
            url: window.location.href,
          })
        } catch (error) {
          console.error('Error sharing:', error)
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

    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
        
        {/* Header Section */}
        <header className="pt-24 pb-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-2">
                {previous && (
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Previous
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
            
            <div className="text-center">
              {/* Meta Information */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
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
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-4">
                {blogPost.title}
              </h1>

              {/* Excerpt/Description */}
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {blogPost.excerpt}
              </p>

              <div className="flex items-center justify-center gap-4">
                <ShareButton 
                  title={blogPost.title}
                  url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://livingtechcreative.com'}/blog/${blogPost.slug}`}
                />
                
                {/* No live/code links for blog posts */}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Cover Image */}
          <section className="mb-8 sm:mb-12">
            <Card className="w-full max-w-4xl mx-auto overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden">
                  <Image
                    src={normalizeImagePath(blogPost.cover_image)}
                    alt={blogPost.title}
                    fill
                    className="object-cover"
                    unoptimized={normalizeImagePath(blogPost.cover_image).includes('livingtechcreative.com')}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Blog Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="flex-1">
              {/* Introduction */}
              {blogPost.introduction && (
                <section className="mb-8">
                  <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-purple-500">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: blogPost.introduction }}
                    />
                  </div>
                </section>
              )}

              {/* Main Content */}
              <section className="mb-8">
                <div 
                  className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </section>

              {/* Conclusion */}
              {blogPost.conclution && (
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Conclusion</h2>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: blogPost.conclution }}
                    />
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80">
              {/* Author Info */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
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
              </div>

              {/* Related Posts */}
              {allBlogPosts.length > 1 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
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
                </div>
              )}
            </aside>
          </div>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <div>
              {previous && (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Previous</div>
                    <div className="font-medium">{previous.title}</div>
                  </div>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Next</div>
                    <div className="font-medium">{next.title}</div>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}