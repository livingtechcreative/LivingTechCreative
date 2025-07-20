"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { DecodingText } from "@/components/ui/decoding-text"
import { DesktopNav } from "./components/DesktopNav"
import { MobileNav } from "./components/MobileNav"

export const Navigation = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between w-full max-w-[95vw] mx-auto px-4">
          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Navigation - Only show on mobile */}
          <div className="2xl:hidden flex items-center w-full justify-between">
            {/* Logo */}
            <motion.div 
              className="h-14 flex items-center gap-2 px-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/livlogo.png"
                  width={25}
                  height={25}
                  className="h-6 w-auto"
                  priority
                  alt="LivingTech Creative Logo"
                />
              </motion.div>
              <div className="overflow-hidden">
                <DecodingText 
                  text="LivingTech Creative" 
                  className="text-base font-semibold whitespace-nowrap text-black" 
                />
              </div>
            </motion.div>
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
