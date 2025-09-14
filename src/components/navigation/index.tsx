"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DesktopNav } from "./components/DesktopNav"
import { MobileNav } from "./components/MobileNav"
import { LanguageToggle } from "./components/LanguageToggle"
import { MenuItem } from "./types/menu.types"

export const Navigation = () => {
  const router = useRouter()

  const handleItemClick = (item: MenuItem) => {
    if (item.url) {
      if (item.target === "_blank") {
        window.open(item.url, "_blank", "noopener,noreferrer")
      } else {
        router.push(item.url)
      }
    }
  }
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full">
        {/* Desktop Navigation */}
        <div className="hidden 2xl:block w-full max-w-[95vw] mx-auto px-4">
          <DesktopNav onItemClick={handleItemClick} />
        </div>

        {/* Mobile Navigation - Fixed at bottom (no animation) */}
        <div className="2xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <div className="flex items-center justify-between w-full max-w-[95vw] mx-auto px-4 py-2">
            {/* Logo and Language Toggle */}
            <div className="flex items-center gap-2">
              <motion.div className="h-14 flex items-center">
                <Image
                  src="/images/livtechlogo.svg"
                  width={120}
                  height={30}
                  className="h-6 w-auto"
                  alt="LivTech Logo"
                />
              </motion.div>
              <LanguageToggle />
            </div>

            {/* Navigation and CTA */}
            <div className="flex items-center gap-2">
              <MobileNav onItemClick={handleItemClick} />
              <a 
                href="#book-call" 
                className="px-3 py-1.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
