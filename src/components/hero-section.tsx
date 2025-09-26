"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"

// Types
type AnimationVariants = Record<string, Variants>

// Animation variants
const heroVariants: AnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
  },
  sleek: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  fast: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.05,
      },
    },
  },
  trafficLight: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  },
  and: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  },
  ghostText: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.15,
      },
    },
  },
  anime: {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: "backOut",
        delay: 0.2,
      },
    },
  },
  animeMobile: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.5,
      },
    },
  },
}

// Hero Content Component
const HeroContent = () => {
  const defaultVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    sleek: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    fast: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    trafficLight: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    and: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    ghostText: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    anime: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    animeMobile: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    subtitle: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  }

  const animationVariants = heroVariants || defaultVariants

  return (
    <motion.div
      className="max-w-7xl mx-auto text-center"
      variants={animationVariants.container}
      initial="hidden"
      animate="visible"
    >
      {/* Available for work badge */}
      <motion.div
        className="flex items-center justify-center mb-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        <div className="inline-flex items-center px-4 py-1.5 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="relative flex h-2.5 w-2.5 mr-2">
            <div className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></div>
            <div className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></div>
          </div>
          <span className="text-xs font-medium text-gray-700">Available for work</span>
        </div>
      </motion.div>

      {/* Heading with blur reveal from left to right */}
      <motion.div
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-8"
        variants={animationVariants.sleek}
      >
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex flex-nowrap items-center justify-center w-full px-4 overflow-x-hidden">
            <motion.div className="flex items-center flex-shrink-0" variants={animationVariants.sleek}>
              <span className="whitespace-nowrap font-bold">Sleek</span>
              <div className="relative mx-2 translate-y-1 overflow-hidden hero-icon">
                <Image
                  src="/images/man.png"
                  alt="Sleek"
                  width={32}
                  height={32}
                  className="object-contain w-8 h-8"
                />
              </div>
              <span className="whitespace-nowrap font-bold">, Fast</span>
              <div className="relative ml-2 translate-y-1 overflow-hidden hero-icon">
                <Image
                  src="/images/eagle.png"
                  alt="Fast"
                  width={32}
                  height={32}
                  className="object-contain w-8 h-8"
                />
              </div>
            </motion.div>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-2 mt-4">
            <motion.span className="inline-block font-bold" variants={animationVariants.ghostText}>
              {"Doesn't Ghost"}
            </motion.span>
            <motion.div className="relative -translate-y-1 inline-block hero-icon" variants={animationVariants.animeMobile}>
              <Image
                src="/images/ghost.png"
                alt="Doesn't Ghost"
                width={32}
                height={32}
                className="object-contain w-8 h-8"
              />
            </motion.div>
            <motion.span className="inline-block font-bold" variants={animationVariants.ghostText}>
              You After 
            </motion.span>
            <motion.span 
              className="inline-block font-bold bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent" 
              style={{
                backgroundImage: 'linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)'
              }}
              variants={animationVariants.ghostText}
            >
              Launch
            </motion.span>
          </div>
        </div>

        {/* Tablet & Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex flex-wrap items-end justify-center gap-3 md:gap-4 lg:gap-6">
            <motion.span className="inline-block font-bold" variants={animationVariants.sleek}>
              Sleek
            </motion.span>
            <motion.div className="relative -translate-y-5 inline-block hero-icon" variants={animationVariants.sleek}>
              <Image
                src="/images/man.svg"
                alt="Sleek"
                width={56}
                height={56}
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
              />
            </motion.div>
            <motion.span className="inline-block font-bold" variants={animationVariants.and}>
              , Fast
            </motion.span>
            <motion.div className="relative -translate-y-5 inline-block hero-icon" variants={animationVariants.fast}>
              <Image
                src="/images/eagle.svg"
                alt="Fast"
                width={56}
                height={56}
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
              />
            </motion.div>
          </div>
          <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-3 lg:gap-4 mt-4 whitespace-nowrap">
            <motion.span className="inline-block font-bold" variants={animationVariants.ghostText}>
              {"Doesn't Ghost"}
            </motion.span>
            <motion.div className="relative -translate-y-1 inline-block hero-icon" variants={animationVariants.anime}>
              <Image
                src="/images/ghost.svg"
                alt="Doesn't Ghost"
                width={56}
                height={56}
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
              />
            </motion.div>
            <motion.span className="inline-block font-bold" variants={animationVariants.ghostText}>
              You After 
            </motion.span>
            <motion.span 
              className="inline-block font-bold bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent" 
              style={{
                backgroundImage: 'linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)'
              }}
              variants={animationVariants.ghostText}
            >
              Launch
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p 
        className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12"
        variants={animationVariants.subtitle}
      >
        We create stunning, high-performance websites that don&apos;t ghost you after launch.
        Your success is our priority, from concept to launch and beyond.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        className="flex justify-center"
        variants={animationVariants.subtitle}
      >
        <motion.a
          href="#contact"
          className="px-8 py-3.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-colors text-base sm:text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Book a Call
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

// Main Hero Section Component
export default function HeroSection() {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Left Background Image */}
        <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 hidden sm:block">
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
        <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2 hidden sm:block">
          <Image 
            src="/images/kanan.png" 
            alt="Right background" 
            width={599} 
            height={775.8} 
            className="opacity-100"
            priority
          />
        </div>

        {/* Mobile Background Images - Smaller */}
        <div className="block sm:hidden">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4">
            <Image 
              src="/images/kiri.png" 
              alt="Left background" 
              width={300} 
              height={350} 
              className="opacity-60"
              priority
            />
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4">
            <Image 
              src="/images/kanan.png" 
              alt="Right background" 
              width={300} 
              height={388} 
              className="opacity-60"
              priority
            />
          </div>
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
