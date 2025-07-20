"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MagicMenu from "@/components/magic-menu"
import MobileNavbar from "@/components/mobile-navbar"
import { DecodingText } from "@/components/ui/decoding-text"

export default function IntegratedNavbar() {
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
          <div className="hidden 2xl:flex items-center justify-center w-full relative">
            {/* Logo Section */}
            <motion.div 
              className="absolute left-0 h-14 flex items-center gap-3 px-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/livlogo.png"
                  alt="LivingTech Creative Logo"
                  width={30}
                  height={30}
                  className="h-8 w-auto"
                  priority
                />
              </motion.div>
              <div className="overflow-hidden">
                <DecodingText 
                  text="LivingTech Creative" 
                  className="text-lg font-semibold whitespace-nowrap text-black" 
                />
              </div>
            </motion.div>

            {/* Menu Section - Centered */}
            <div className="relative">
              <div className="h-14 border-gray-200 bg-gray-50 rounded-2xl border-[1px] p-1">
                <MagicMenu />
              </div>
            </div>
            {/* Call to Action - Positioned absolutely on the right */}
            <div className="absolute right-0 h-14 border-gray-200 bg-gray-50 flex items-center rounded-2xl px-4 border-[1px]">
              <Button variant="ghost" className="rounded-xl px-4 py-2 text-base font-medium">
                Book a Call
              </Button>
            </div>
          </div>

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
            <MobileNavbar />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
