"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"
import { X, Menu } from "lucide-react"

const menuItems = [
  { name: "About", href: "about", isPage: false },
  { name: "Services", href: "services", isPage: false },
  { name: "Portfolio", href: "portfolio", isPage: false },
  { name: "Showcase", href: "/showcase", isPage: true },
  { name: "Blog", href: "/blog", isPage: true },
  { name: "Contact", href: "contact", isPage: false }
]

export default function SimpleNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogoClick = () => {
    if (isHomePage) {
      // If on home page, scroll to top
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // If on other pages, navigate to home page
      router.push('/')
    }
  }

  const handleNavItemClick = (item: { href: string; isPage: boolean }) => {
    if (item.isPage) {
      // Navigate to separate page
      router.push(item.href)
    } else if (isHomePage) {
      // If on home page, use smooth scroll
      return
    } else {
      // If on other pages, navigate to home page with section
      router.push(`/#${item.href}`)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-4 relative">
        {/* Navbar Container */}
        <motion.div
          className="flex items-center gap-8 px-8 py-3 rounded-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(128, 128, 128, 0.2)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.05 }}
        >
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="cursor-pointer"
          >
            <Image src="/images/livtechlogo.svg" alt="Logo" width={120} height={32} className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-6">
            {menuItems.map((item) => (
              <div key={item.name}>
                {isHomePage && !item.isPage ? (
                  <ScrollLink
                    to={item.href}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-black font-medium hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </ScrollLink>
                ) : (
                  <button
                    onClick={() => handleNavItemClick(item)}
                    className="text-black font-medium hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="px-6 py-3 rounded-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: "1px solid rgba(128, 128, 128, 0.3)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.08 }}
        >
          <Button
            className="bg-transparent text-white hover:bg-gray-800 transition-all duration-300 font-semibold text-base"
            onClick={() => window.open('https://calendar.app.google/Gtr3aLwyQB5mP8es5', '_blank')}
          >
            Book a Call
          </Button>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full px-4 flex items-center justify-between">
        {/* Mobile Navbar Container */}
        <motion.div
          className="flex items-center gap-4 px-4 py-3 rounded-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(128, 128, 128, 0.2)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.05 }}
        >
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="cursor-pointer"
          >
            <Image src="/images/livtechlogo.svg" alt="Logo" width={90} height={24} className="h-6 w-auto" />
          </div>

          {/* Mobile CTA Button */}
          <Button
            className="bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold text-sm px-4 py-2 rounded-full"
            onClick={() => window.open('https://calendar.app.google/Gtr3aLwyQB5mP8es5', '_blank')}
          >
            Book a Call
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(128, 128, 128, 0.2)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.08 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <nav className="py-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.02 }}
                  >
                    {isHomePage && !item.isPage ? (
                      <ScrollLink
                        to={item.href}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-6 py-3 text-black font-medium hover:bg-gray-100/50 transition-colors cursor-pointer"
                      >
                        {item.name}
                      </ScrollLink>
                    ) : (
                      <button
                        onClick={() => {
                          handleNavItemClick(item)
                          setIsMobileMenuOpen(false)
                        }}
                        className="block w-full text-left px-6 py-3 text-black font-medium hover:bg-gray-100/50 transition-colors"
                      >
                        {item.name}
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 