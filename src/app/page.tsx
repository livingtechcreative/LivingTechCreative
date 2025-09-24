import IntegratedNavbar from "@/components/integrated-navbar"
import HeroSection from "@/components/hero-section"
import HeroMarqueeSection from "@/components/hero-marquee-section"
import AboutUsSection from "@/components/about-us-section"
import ComparisonSection from "@/components/comparison-section"
import ServicesSection from "@/components/services-section"
import StackMarqueeSection from "@/components/stack-marquee-section"
import BannerSection from "@/components/banner-section"
import PortfolioSection from "@/components/portfolio-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { apiService } from "@/lib/api"

export default async function Home() {
  // Server-side fetch to avoid CORS in browser
  const portfolios = await apiService.getPortfolios()

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <IntegratedNavbar />
        <div id="hero">
          <HeroSection />
        </div>
        <HeroMarqueeSection initialPortfolios={portfolios} />
        <ComparisonSection />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="portofolio">
          <PortfolioSection initialPortfolios={portfolios} />
        </div>
        <BannerSection />
        <div id="about">
          <AboutUsSection />
        </div>
        <StackMarqueeSection />
        <div id="faq">
          <FAQSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
        <Footer />
    </div>
  )
}
