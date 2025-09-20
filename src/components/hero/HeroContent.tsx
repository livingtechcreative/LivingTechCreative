"use client"

import { motion } from "framer-motion"
import type { AnimationVariants } from "./types"

interface HeroContentProps {
  variants?: AnimationVariants
}



export const HeroContent = ({ variants }: HeroContentProps) => {
  const defaultVariants: AnimationVariants = {
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

  const animationVariants = variants || defaultVariants

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
                <img
                  src="/images/man.svg"
                  alt="Sleek"
                  width="32"
                  height="32"
                  className="object-contain w-8 h-8"
                  style={{ 
                    filter: 'none', 
                    opacity: 1,
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
              <span className="whitespace-nowrap font-bold">, Fast</span>
              <div className="relative ml-2 translate-y-1 overflow-hidden hero-icon">
                <img
                  src="/images/eagle.svg"
                  alt="Fast"
                  width="32"
                  height="32"
                  className="object-contain w-8 h-8"
                  style={{ 
                    filter: 'none', 
                    opacity: 1,
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </motion.div>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-2 mt-4">
            <motion.span className="inline-block font-bold" variants={animationVariants.ghostText}>
              {"Doesn't Ghost"}
            </motion.span>
            <motion.div className="relative -translate-y-1 inline-block hero-icon" variants={animationVariants.animeMobile}>
              <img
                src="/images/ghost.svg"
                alt="Doesn't Ghost"
                width="32"
                height="32"
                className="object-contain w-8 h-8"
                style={{ 
                  filter: 'none', 
                  opacity: 1,
                  display: 'block',
                  maxWidth: '100%',
                  height: 'auto'
                }}
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
              <img
                src="/images/man.svg"
                alt="Sleek"
                width="56"
                height="56"
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                style={{ 
                  filter: 'none', 
                  opacity: 1,
                  display: 'block',
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </motion.div>
            <motion.span className="inline-block font-bold" variants={animationVariants.and}>
              , Fast
            </motion.span>
            <motion.div className="relative -translate-y-5 inline-block hero-icon" variants={animationVariants.fast}>
              <img
                src="/images/eagle.svg"
                alt="Fast"
                width="56"
                height="56"
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                style={{ 
                  filter: 'none', 
                  opacity: 1,
                  display: 'block',
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </motion.div>
          </div>
          <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-3 lg:gap-4 mt-4 whitespace-nowrap">
            <motion.span className="inline-block font-bold" variants={animationVariants.ghostText}>
              {"Doesn't Ghost"}
            </motion.span>
            <motion.div className="relative -translate-y-1 inline-block hero-icon" variants={animationVariants.anime}>
              <img
                src="/images/ghost.svg"
                alt="Doesn't Ghost"
                width="56"
                height="56"
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                style={{ 
                  filter: 'none', 
                  opacity: 1,
                  display: 'block',
                  maxWidth: '100%',
                  height: 'auto'
                }}
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

      {/* Separate animation for subtitle */}
      <motion.div
        className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 -mt-2"
        variants={animationVariants.subtitle}
      >
        <p className="mb-2">
          Living Tech Creative is a professional digital agency that helps you grow.
        </p>
        <p>
          From strategy to execution, we grow your product without the stress.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 px-4 sm:px-0 flex items-center justify-center"
      >
        {/* Book A Meeting Button */}
        <motion.button
          type="button"
          onClick={() => {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group relative inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Book a meeting
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-1 transition-transform duration-300"
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </span>
        </motion.button>
      </motion.div>

      {/* Separate animation for footer text */}
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-4 text-sm text-gray-500"
      >
        Free 30-Minute Consultation • No Commitment Required
      </motion.p>

    </motion.div>
  )
}
