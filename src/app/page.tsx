"use client"

import { useEffect, useState } from "react"
import IntegratedNavbar from "@/components/integrated-navbar"
import HeroSection from "@/components/hero-section"

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    // Set timer to show navbar after hero section animations complete (6.8s + 0.5s buffer)
    const timer = setTimeout(() => {
      setShowNavbar(true)
    }, 7500) // 7.5 detik untuk memastikan semua animasi hero selesai

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {showNavbar && <IntegratedNavbar />}
      <HeroSection />
    </div>
  )
}
