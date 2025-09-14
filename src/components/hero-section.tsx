"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { HeroContent } from "./hero/HeroContent"
import { heroVariants } from "./hero/animations/heroVariants"

export default function HeroSection() {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Left Background Image */}
        <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <Image 
            src="/images/kiri.png" 
            alt="Left background" 
            width={599.6} 
            height={695.8} 
            className="opacity-100"
            priority
          />
        </div>
        
        {/* Right Background Image */}
        <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2">
          <Image 
            src="/images/kanan.png" 
            alt="Right background" 
            width={599} 
            height={775.8} 
            className="opacity-100"
            priority
          />
        </div>
      </div>

      <motion.div
        className="w-full max-w-7xl mx-auto text-center relative z-10"
        variants={heroVariants.container}
        initial="hidden"
        animate="visible"
      >
        <HeroContent />
      </motion.div>
    </div>
  )
}
