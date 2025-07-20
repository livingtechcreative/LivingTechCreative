"use client"

import { motion } from "framer-motion"
import { HeroContent } from "./hero/HeroContent"
import { heroVariants } from "./hero/animations/heroVariants"

export default function HeroSection() {
  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-screen bg-gray-50 flex items-center justify-center px-4 -mt-16 pt-16">
      <motion.div
        className="w-full max-w-5xl mx-auto text-center"
        variants={heroVariants.container}
        initial="hidden"
        animate="visible"
      >
        <HeroContent variants={heroVariants} />
      </motion.div>
    </div>
  )
}
