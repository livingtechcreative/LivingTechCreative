import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Phone } from "lucide-react"
import Link from "next/link"
import IntegratedNavbar from "@/components/integrated-navbar"
import Footer from "@/components/footer"
import { apiService } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import { notFound } from "next/navigation"
import CTABanner from "@/components/cta-banner"

// Animation variants
// Server-rendered page (no animations)





export async function generateStaticParams() {
  try {
    const portfolios = await apiService.getPortfolios()
    return portfolios.filter(p => p.is_active).map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export const dynamicParams = false

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const allPortfolios = await apiService.getPortfolios()
  const activePortfolios = allPortfolios.filter(p => p.is_active)
  const portfolio = activePortfolios.find(p => p.slug === slug)
  const currentIndex = activePortfolios.findIndex(p => p.slug === slug)

  if (!portfolio) {
    notFound()
  }

  const previous = currentIndex > 0 ? activePortfolios[currentIndex - 1] : null
  const next = currentIndex < activePortfolios.length - 1 ? activePortfolios[currentIndex + 1] : null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (!portfolio) return null

    return (
      <div className="min-h-screen bg-white">
        <IntegratedNavbar />
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
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.background}
                  </p>
                </div>
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
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.problem}
                  </p>
                </div>
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
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                    {portfolio.goal}
                  </p>
                </div>
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

                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
                >
                  <div 
                    className="space-y-3 p-3 sm:p-0"
                  >
                    <div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">User-Centered Design</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Implemented intuitive user interfaces and seamless user experiences that prioritize user needs and goals.
                    </p>
                  </div>

                  <div 
                    className="space-y-3 p-3 sm:p-0"
                  >
                    <div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Modern Technology Stack</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Utilized cutting-edge technologies and frameworks to ensure scalability, performance, and maintainability.
                    </p>
                  </div>

                  <div 
                    className="space-y-3 p-3 sm:p-0"
                  >
                    <div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Responsive Architecture</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Built flexible and adaptive systems that work seamlessly across all devices and platforms.
                    </p>
                  </div>

                  <div 
                    className="space-y-3 p-3 sm:p-0"
                  >
                    <div 
                      className="bg-gray-200 rounded-lg h-24 sm:h-32 flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Performance Optimization</h3>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Optimized for speed and efficiency, ensuring fast loading times and smooth user interactions.
                    </p>
                  </div>
                </div>
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
                  ].map((item, index) => (
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

          <CTABanner className="mt-12 sm:mt-16 mb-6 sm:mb-8 -mx-4 sm:-mx-6" compact />
        </main>
        <Footer />
      </div>
  )
}
