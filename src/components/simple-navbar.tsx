"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Link as ScrollLink } from "react-scroll"
import { X, Menu, Home, Briefcase, BookOpen, MessageCircle, User, Wrench, Phone } from "lucide-react"

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
    <>
      {/* Desktop Navbar - Tetap di atas */}
      <motion.div
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center items-center ${isScrolled ? 'py-2' : 'py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {/* Desktop Layout */}
        <div className="flex items-center gap-4 relative">
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
            className="px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              border: "1px solid rgba(128, 128, 128, 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: 0.08 }}
          >
            <Button
              className="bg-transparent text-white hover:bg-gray-800 transition-all duration-300 font-semibold text-xs sm:text-sm"
              onClick={() => window.open('https://calendar.app.google/gHQsqDPtkg2MFs519', '_blank')}
            >
              Book a Call
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Layout - Dihapus, hanya gunakan bottom navigation */}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Mobile Menu Dropdown - Di atas bottom nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute bottom-20 left-4 right-4"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="rounded-2xl shadow-2xl border p-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)", /* Sangat transparan */
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Menu</h3>
                  <button onClick={toggleMobileMenu} className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.name}>
                      {isHomePage && !item.isPage ? (
                        <ScrollLink
                          to={item.href}
                          smooth={true}
                          duration={500}
                          offset={-80}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name === "About" && <User className="w-5 h-5" />}
                          {item.name === "Services" && <Wrench className="w-5 h-5" />}
                          {item.name === "Portfolio" && <Briefcase className="w-5 h-5" />}
                          {item.name === "Showcase" && <BookOpen className="w-5 h-5" />}
                          {item.name === "Blog" && <BookOpen className="w-5 h-5" />}
                          {item.name === "Contact" && <MessageCircle className="w-5 h-5" />}
                          <span className="font-medium">{item.name}</span>
                        </ScrollLink>
                      ) : (
                        <button
                          onClick={() => {
                            handleNavItemClick(item)
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left text-gray-800"
                        >
                          {item.name === "About" && <User className="w-5 h-5" />}
                          {item.name === "Services" && <Wrench className="w-5 h-5" />}
                          {item.name === "Portfolio" && <Briefcase className="w-5 h-5" />}
                          {item.name === "Showcase" && <BookOpen className="w-5 h-5" />}
                          {item.name === "Blog" && <BookOpen className="w-5 h-5" />}
                          {item.name === "Contact" && <MessageCircle className="w-5 h-5" />}
                          <span className="font-medium">{item.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation Bar - Dengan glass effect lebih transparan dan dinaikkan */}
        <motion.div 
          className="px-4 py-3 mx-4 mb-2 rounded-full" /* mb-4 diubah jadi mb-2 untuk naikkan posisi */
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)", /* Dibuat lebih transparan dari 0.4 ke 0.2 */
            backdropFilter: "blur(30px)", /* Ditingkatkan dari 20px ke 30px */
            WebkitBackdropFilter: "blur(30px)", /* Ditingkatkan dari 20px ke 30px */
            border: "1px solid rgba(255, 255, 255, 0.3)", /* Border lebih terang */
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)", /* Tambahan shadow untuk efek glass */
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.05 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={handleLogoClick}
              className="cursor-pointer"
            >
              <Image src="/images/livtechlogo.svg" alt="Logo" width={80} height={20} className="h-5 w-auto" />
            </div>

            {/* Tombol Hamburger di kanan logo */}
            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </motion.button>

            {/* WhatsApp dan Book Button */}
            <div className="flex items-center gap-2">
              {/* WhatsApp Button dengan glass effect lebih transparan */}
              <motion.button
                className="p-2 rounded-full"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.3)", /* Dibuat lebih transparan dari 0.6 ke 0.3 */
                  backdropFilter: "blur(20px)", /* Ditingkatkan dari 10px ke 20px */
                  WebkitBackdropFilter: "blur(20px)", /* Ditingkatkan dari 10px ke 20px */
                  border: "1px solid rgba(255, 255, 255, 0.4)", /* Border lebih terang */
                }}
                onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 text-green-600" />
              </motion.button>

              {/* CTA Button */}
              <Button
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold text-xs px-3 py-2 rounded-full"
                onClick={() => window.open('https://calendar.app.google/gHQsqDPtkg2MFs519', '_blank')}
              >
                Book
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}