import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import Link from "next/link"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"

// Animation variants
export async function generateStaticParams() {
  try {
    const posts = await apiService.getActiveBlogPosts()
    return posts.map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = false

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allBlogPosts = await apiService.getActiveBlogPosts()
  const blogPost = allBlogPosts.find(p => p.slug === slug)
  const currentIndex = allBlogPosts.findIndex(p => p.slug === slug)

  if (!blogPost) {
    notFound()
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

  if (!blogPost) return null

  return (
      <div
        className="min-h-screen bg-white"
      >
        <IntegratedNavbar />
        
        {/* Header Section */}
        <header 
          className="pt-24 pb-8 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Navigation */}
            <div 
              className="flex items-center justify-between mb-6"
            >
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
              <div 
                className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6"
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
              </div>

              {/* Title */}
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-4"
              >
                {blogPost.title}
              </h1>

              {/* Excerpt */}
              <p
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              >
                {blogPost.excerpt}
              </p>

              {/* Share Button */}
              <div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Cover Image */}
          <section 
            className="mb-8 sm:mb-12"
          >
            <div>
              <Card className="w-full max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden"
                  >
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
            </div>
          </section>

          {/* Blog Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <article 
              className="flex-1"
            >
              {/* Introduction */}
              {blogPost.introduction && (
                <section 
                  className="mb-8"
                >
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
              <section 
                className="mb-8"
              >
                <div 
                  className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </section>

              {/* Conclusion */}
              {blogPost.conclution && (
                <section 
                  className="mb-8"
                >
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
            <aside 
              className="lg:w-80"
            >
              {/* Author Info */}
              <div 
                className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
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
              </div>

              {/* Related Posts */}
              {allBlogPosts.length > 1 && (
                <div 
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
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
                </div>
              )}
            </aside>
          </div>

          {/* Navigation Footer */}
          <div 
            className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200"
          >
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
}
