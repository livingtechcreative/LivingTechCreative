"use client"

import { useEffect, useState } from "react"
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

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    // Show navbar after a short delay for better UX
    const timer = setTimeout(() => {
      setShowNavbar(true)
    }, 3000) // 0.5 detik delay untuk animasi masuk navbar

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Handle hash navigation when coming from portfolio pages
    const handleHashNavigation = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.substring(1) // Remove the #
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }, 1000) // Wait for navbar to show
        }
      }
    }

    handleHashNavigation()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {showNavbar && <IntegratedNavbar />}
        <div id="hero">
          <HeroSection />
        </div>
        <HeroMarqueeSection />
        <ComparisonSection />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="portfolio">
          <PortfolioSection />
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
