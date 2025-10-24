import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import { notFound } from "next/navigation"
import CTABanner from "@/components/cta-banner"
import ScrollToTop from "@/components/scroll-to-top"
import { ImageWithModal } from "@/components/ui/image-modal"

export const dynamicParams = true
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  // Await params to get the slug
  const { slug } = await params

  // SSR: fetch from API
  const allPortfolios = await apiService.getPortfolios()
  const activePortfolios = allPortfolios.filter(p => p?.is_active)
  const portfolio = activePortfolios.find(p => p.slug === slug)
  const currentIndex = activePortfolios.findIndex(p => p.slug === slug)

  if (!portfolio) {
    notFound()
  }

  const previous = currentIndex > 0 ? activePortfolios[currentIndex - 1] : null
  const next = currentIndex < activePortfolios.length - 1 ? activePortfolios[currentIndex + 1] : null

  // Fetch solutions - gunakan data real dari API dan filter berdasarkan portfolio ID
  const allSolutions = await apiService.getPortfolioSolutions(Number(portfolio.id))
    
  // Filter solutions yang sesuai dengan portfolio ID saat ini
  const solutions = Array.isArray(allSolutions) 
    ? allSolutions.filter((sol: any) => Number(sol.portofolio_id) === Number(portfolio.id))
    : []
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatContentWithLists = (content: string) => {
    if (!content) return ''
    
    // Replace numbered lists with proper HTML formatting
    let formatted = content
      .replace(/(\d+)\.\s/g, '<br><strong class="text-blue-600 text-base">$1.</strong> ')
      .replace(/^<br>/, '') // Remove leading br if content starts with number
    
    // Add proper spacing and styling for better readability
    formatted = formatted.replace(/<br><strong/g, '<br><br><strong')
    
    return formatted
  }

  return (
    <div className="min-h-screen bg-white">
      <header 
        className="bg-white pt-16 sm:pt-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div 
            className="flex items-start"
          >
            <div>
              <Link href="/portofolio">
                <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4" />
                  Return
                </Button>
              </Link>
            </div>
          </div>
          <div
            className="text-left mt-6 sm:mt-8 mb-6"
          >
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4"
            >
              {portfolio.title}
            </h1>
            {portfolio.project_url && (
              <div className="px-4">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <ExternalLink className="w-4 h-4" />
                  <a href={portfolio.project_url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <section 
          className="mb-8 sm:mb-12"
        >
          <div className="w-full max-w-4xl mx-auto">
            {portfolio.cover_image && (
              <ImageWithModal
                src={normalizeImagePath(portfolio.cover_image)}
                alt={portfolio.title}
                className="w-full"
              >
                <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={normalizeImagePath(portfolio.cover_image)}
                      alt={portfolio.title}
                      fill
                      className="object-contain w-full h-full"
                      style={{ objectFit: 'contain' }}
                      unoptimized={normalizeImagePath(portfolio.cover_image).includes('livingtechcreative.com')}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                </div>
              </ImageWithModal>
            )}
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content - Left Side */}
          <div 
            className="flex-1 max-w-7xl"
          >
            {/* Background Section */}
            <section 
              id="background" 
              className="mb-6 sm:mb-8"
            >
              <h2 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
              >
                Background
              </h2>
              <div 
                className="prose prose-gray max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContentWithLists(String(portfolio.background || '')) }}
              />
            </section>

            <section 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200"
            >
              <div
                className="p-3 sm:p-0"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Client</h4>
                <p className="text-sm text-gray-700">{portfolio.client}</p>
              </div>

              <div
                className="p-3 sm:p-0"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Industry</h4>
                <p className="text-sm text-gray-700">{portfolio.category}</p>
              </div>

              <div
                className="p-3 sm:p-0"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Timeline</h4>
                <p className="text-sm text-gray-700">
                  {formatDate(portfolio.start_date)} - {formatDate(portfolio.end_date)}
                </p>
              </div>

              <div
                className="p-3 sm:p-0"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Duration</h4>
                <p className="text-sm text-gray-700">{portfolio.duration_days} days</p>
              </div>
            </section>

            <section 
              id="problem" 
              className="mb-6 sm:mb-8"
            >
              <h2 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
              >
                Problem
              </h2>
              <div 
                className="prose prose-gray max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContentWithLists(String(portfolio.problem || '')) }}
              />
            </section>

            <section 
              id="goal" 
              className="mb-6 sm:mb-8"
            >
              <h2 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
              >
                Goal
              </h2>
              <div 
                className="prose prose-gray max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatContentWithLists(String(portfolio.goal || '')) }}
              />
            </section>

            <section 
              id="solution" 
              className="mb-6 sm:mb-8"
            >
              <h2 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6"
              >
                Solution
              </h2>
              {solutions.length > 0 ? (
                <div className="space-y-8 sm:space-y-12">
                  {solutions.map((sol, index) => (
                    <div key={sol.id} className="">
                      {/* Gambar dengan rounded corners - terpisah dari description */}
                      {sol.image ? (
                        <ImageWithModal
                          src={normalizeImagePath(sol.image)}
                          alt={sol.title}
                          className="w-full mb-6 sm:mb-8"
                        >
                          <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
                            <div className="relative aspect-[16/9] w-full">
                              <Image
                                src={normalizeImagePath(sol.image)}
                                alt={sol.title}
                                fill
                                className="object-contain w-full h-full"
                                style={{ objectFit: 'contain' }}
                                unoptimized={normalizeImagePath(sol.image).includes('livingtechcreative.com')}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                              />
                            </div>
                          </div>
                        </ImageWithModal>
                      ) : (
                        <div className="w-full aspect-[16/9] mb-6 sm:mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-white font-bold text-2xl">{index + 1}</span>
                            </div>
                            <p className="text-gray-500 text-sm">Solution {index + 1}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Description di bawah gambar - tidak dalam card */}
                      <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{sol.title}</h3>
                        <div
                          className="prose prose-gray max-w-none text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatContentWithLists(sol.description) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                Boolean((portfolio as any).solution) && (
                  <div 
                    className="prose prose-gray max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatContentWithLists((portfolio as any).solution) }}
                  />
                )
              )}
            </section>

            <section 
              id="conclusion" 
              className="mb-6 sm:mb-8"
            >
              <h2 
                className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4"
              >
                Conclusion
              </h2>
              <div 
                className="prose prose-gray max-w-none"
              >
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  {portfolio.conclution}
                </p>
              </div>
            </section>

            {(previous || next) && (
              <div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 sm:pt-8 border-t border-gray-200"
              >
                <div
                  className="w-full sm:w-auto"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-start"
                    asChild
                    disabled={!previous}
                  >
                    <Link href={previous ? `/portofolio/${previous.slug}` : "#"}>
                    <ArrowLeft className="w-4 h-4" />
                    <span className="truncate">
                        {previous ? previous.title : 'Previous Project'}
                    </span>
                    </Link>
                  </Button>
                </div>
                <div
                  className="w-full sm:w-auto"
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-end"
                    asChild
                    disabled={!next}
                  >
                    <Link href={next ? `/portofolio/${next.slug}` : "#"}>
                    <span className="truncate">
                        {next ? next.title : 'Next Project'}
                    </span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div 
            className="hidden md:block w-56 flex-shrink-0"
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
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}