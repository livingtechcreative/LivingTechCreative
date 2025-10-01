import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { apiService } from "@/lib/api"
import portfolioSlugs from "@/data/portfolio-slugs.json"
import portfolioItems from "@/data/portfolio-items.json"
import { normalizeImagePath } from "@/lib/utils"
import { notFound } from "next/navigation"
import CTABanner from "@/components/cta-banner"

// Generate static params using prebuilt data (created in scripts/generate-portfolio-data.js)
export function generateStaticParams(): { slug: string }[] {
  console.log('[build] generateStaticParams(portofolio/page) called')
  const slugs = (portfolioSlugs as string[])
  if (!Array.isArray(slugs) || slugs.length === 0) {
    return []
  }
  return slugs.map((slug) => ({ slug }))
}

// Keep these settings for static export
export const dynamicParams = false
export const dynamic = 'force-static'

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Use prebuilt items during static export to avoid runtime network calls
  const allPortfolios = (portfolioItems as any[])
  const activePortfolios = allPortfolios.filter(p => p?.is_active)
  const portfolio = activePortfolios.find(p => p.slug === slug)
  const currentIndex = activePortfolios.findIndex(p => p.slug === slug)

  if (!portfolio) {
    notFound()
  }

  const previous = currentIndex > 0 ? activePortfolios[currentIndex - 1] : null
  const next = currentIndex < activePortfolios.length - 1 ? activePortfolios[currentIndex + 1] : null

  // Fetch solutions from separate endpoint (build-time) with graceful fallback
  let solutions: Array<{ id: number; title: string; description: string; image: string }> = []
  try {
    const apiSolutions = await apiService.getPortfolioSolutions(Number(portfolio.id))
    if (Array.isArray(apiSolutions) && apiSolutions.length > 0) {
      solutions = apiSolutions.map((s: any) => ({
        id: Number(s.id),
        title: String(s.title || ''),
        description: String(s.description || ''),
        image: String(s.image || '')
      }))
    }
  } catch (e) {
    // ignore and fallback below
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <header 
        className="bg-white pt-20 sm:pt-32"
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
            className="text-center mt-6 sm:mt-8 mb-6"
          >
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4"
            >
              {portfolio.title}
            </h1>
            {portfolio.project_url && (
              <div>
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
          <div>
            <Card className="w-full max-w-4xl mx-auto">
              <CardContent className="p-0">
                {portfolio.cover_image && (
                  <div
                    className="w-full h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden"
                  >
                    <Image
                      src={normalizeImagePath(portfolio.cover_image)}
                      alt={portfolio.title}
                      fill
                      className="object-cover"
                      unoptimized={normalizeImagePath(portfolio.cover_image).includes('livingtechcreative.com')}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
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
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: String(portfolio.background || '') }}
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
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: String(portfolio.problem || '') }}
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
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: String(portfolio.goal || '') }}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {solutions.map((sol) => (
                    <div key={sol.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      {sol.image ? (
                        <div className="relative h-40 sm:h-48">
                          <Image
                            src={normalizeImagePath(sol.image)}
                            alt={sol.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">{sol.title}</h3>
                        <div
                          className="prose prose-gray max-w-none text-sm"
                          dangerouslySetInnerHTML={{ __html: sol.description }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                Boolean((portfolio as any).solution) && (
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: (portfolio as any).solution }}
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
    </div>
  )
}