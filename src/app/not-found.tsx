"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

// Pastikan halaman ini dirender sebagai client component
export const dynamic = 'force-dynamic'

export default function NotFound() {
  useEffect(() => {
    // Fungsi untuk menyembunyikan navbar, footer, dan WhatsApp float button
    const hideElements = () => {
      try {
        // Cari dan sembunyikan navbar dengan berbagai selector
        const navbarSelectors = [
          '[data-slot="navbar"]',
          '.fixed.top-0.left-0.right-0.z-50',
          '#navbar',
          'header',
          'nav'
        ]
        
        // Cari dan sembunyikan footer dengan berbagai selector
        const footerSelectors = [
          '[data-slot="footer"]',
          'footer',
          '#footer',
          '.footer'
        ]
        
        // Cari dan sembunyikan WhatsApp float button
        const whatsappSelectors = [
          '.floating-whatsapp',
          '.floating-wpp',
          '.whatsapp-button',
          '.whatsapp-float',
          '[data-testid="whatsapp"]',
          '[data-slot="whatsapp"]',
          '.react-floating-whatsapp',
          '.react-whatsapp',
          '.whatsapp-widget'
        ]
        
        // Sembunyikan navbar
        navbarSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            if (el) (el as HTMLElement).style.display = 'none'
          })
        })
        
        // Sembunyikan footer
        footerSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            if (el) (el as HTMLElement).style.display = 'none'
          })
        })
        
        // Sembunyikan WhatsApp float button
        whatsappSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector)
          elements.forEach(el => {
            if (el) (el as HTMLElement).style.display = 'none'
          })
        })
        
        // Sembunyikan semua elemen fixed di pojok kanan bawah (kemungkinan WhatsApp float)
        const allFixedElements = document.querySelectorAll('.fixed, [style*="position: fixed"]')
        allFixedElements.forEach(el => {
          const style = window.getComputedStyle(el)
          const position = style.getPropertyValue('position')
          const bottom = style.getPropertyValue('bottom')
          const right = style.getPropertyValue('right')
          
          // Jika elemen fixed di pojok kanan bawah, kemungkinan WhatsApp float
          if (position === 'fixed' && 
              (bottom.includes('px') || bottom.includes('rem')) && 
              (right.includes('px') || right.includes('rem'))) {
            (el as HTMLElement).style.display = 'none'
          }
        })
        
        // Tambahkan class ke body untuk membantu styling
        document.body.classList.add('not-found-page')
      } catch (error) {
        console.error('Error hiding elements:', error)
      }
    }
    
    // Jalankan beberapa kali untuk memastikan
    hideElements()
    
    // Jalankan lagi setelah DOM sepenuhnya dimuat
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hideElements)
    }
    
    // Jalankan lagi setelah semua resource dimuat
    window.addEventListener('load', hideElements)
    
    // Jalankan beberapa kali dengan interval untuk menangani elemen yang muncul terlambat
    const interval = setInterval(hideElements, 200)
    setTimeout(() => clearInterval(interval), 2000)
    
    return () => {
      window.removeEventListener('load', hideElements)
      document.removeEventListener('DOMContentLoaded', hideElements)
      clearInterval(interval)
    }
  }, [])
  
  return (
    <>
      <style jsx global>{`
        /* Sembunyikan navbar dan footer */
        .fixed.top-0.left-0.right-0.z-50,
        .fixed.bottom-0.left-0.right-0.z-50,
        footer.relative,
        [data-testid="navbar"],
        [data-testid="footer"],
        header,
        nav,
        footer,
        .floating-whatsapp,
        .floating-wpp,
        .whatsapp-button,
        .whatsapp-float,
        [data-testid="whatsapp"],
        [data-slot="whatsapp"],
        .react-floating-whatsapp,
        .react-whatsapp,
        .whatsapp-widget,
        div[style*="position:fixed"][style*="bottom"][style*="right"],
        div[style*="position: fixed"][style*="bottom"][style*="right"] {
          display: none !important;
        }
        
        /* Pastikan halaman 404 tampil penuh */
        body.not-found-page {
          overflow: auto !important;
          height: 100% !important;
        }
        
        /* Reset padding dan margin */
        body.not-found-page > div {
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      <div className="min-h-screen bg-white flex items-center justify-center px-4" style={{ paddingTop: '0 !important', paddingBottom: '0 !important' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-gray-200 leading-none">
            404
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have vanished into the digital void. 
            Don&apos;t worry, even the best developers get lost sometimes!
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="text-6xl sm:text-7xl md:text-8xl">👻</div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>Lost? Don&apos;t worry, we&apos;ll help you find your way back to amazing digital experiences!</p>
        </motion.div>
      </div>
    </div>
  </>
  )
}