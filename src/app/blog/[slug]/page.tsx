import { notFound } from "next/navigation"
import Image from "next/image"
import ShareButton from "@/components/blog/share-button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import ScrollToTop from "@/components/scroll-to-top"

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
      const posts = await apiService.getBlogPosts()
    const activePosts = posts.filter((p: any) => p?.is_active && typeof p.slug === 'string')
    const mapped = activePosts.map((p: any) => ({ slug: p.slug }))
    if (mapped.length === 0) {
          return []
    }
    return mapped
  } catch (e) {
        return []
  }
}
// Mengubah ke SSR mode
export const dynamicParams = true  // Mengizinkan parameter dinamis untuk SSR
export const dynamic = 'force-dynamic'  // Menggunakan SSR
  
  export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    try {
    // Fetch data directly from API
    const allBlogPosts = await apiService.getBlogPosts()
    const activeBlogPosts = allBlogPosts.filter((p: any) => p?.is_active)
    const blogPost = activeBlogPosts.find((p: any) => p.slug === slug)
    const currentIndex = activeBlogPosts.findIndex((p: any) => p.slug === slug)

    if (!blogPost) {
      notFound()
    }
    const previous = currentIndex > 0 ? activeBlogPosts[currentIndex - 1] : null
    const next = currentIndex < activeBlogPosts.length - 1 ? activeBlogPosts[currentIndex + 1] : null

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

        {/* Header Section */}
        <header className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
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

              {/* Category Badge */}
              <div className="flex justify-center mb-4">
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  {blogPost.category || 'Article'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-4 leading-tight">
                {blogPost.title}
              </h1>

              {/* Excerpt/Description */}
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Cover Image */}
          <section className="mb-12">
            <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-64 sm:h-80 md:h-96 relative bg-gradient-to-br from-purple-50 to-indigo-50">
                <Image
                  src={normalizeImagePath(blogPost.cover_image)}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  unoptimized={normalizeImagePath(blogPost.cover_image).includes('livingtechcreative.com')}
                />
              </div>
            </div>
          </section>

          {/* Blog Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="flex-1">
              {/* Introduction */}
              {blogPost.introduction && (
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-purple-500 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
                    <div
                      className="prose prose-gray max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: blogPost.introduction }}
                    />
                  </div>
                </section>
              )}

              {/* Main Content */}
              <section className="mb-8">
                <div
                  className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-ul:my-4 prose-li:my-2 prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:p-4 prose-blockquote:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </section>

              {/* Conclusion */}
              {blogPost.conclution && (
                <section className="mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-purple-200 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Conclusion</h2>
                    <div
                      className="prose prose-gray max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: blogPost.conclution }}
                    />
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80">
              {/* Author Info */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6 mb-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {blogPost.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-lg">{blogPost.author}</p>
                    <p className="text-sm text-gray-600">Content Writer</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  Passionate about sharing insights on technology, design, and digital innovation.
                </div>
              </div>

              {/* Article Info */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Article Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">{formatDate(blogPost.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">{formatReadTime(blogPost.read_duration)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">{blogPost.author}</span>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {activeBlogPosts.length > 1 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {activeBlogPosts
                      .filter((post: any) => post.id !== blogPost.id)
                      .slice(0, 3)
                      .map((relatedPost: any) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors duration-200">
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
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      View all posts
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
        <ScrollToTop />
      </div>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}