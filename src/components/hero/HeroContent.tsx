import Image from "next/image";
import { motion } from "framer-motion";
import { AnimationVariants } from "./types";

interface HeroContentProps {
  variants: AnimationVariants;
}

export const HeroContent = ({ variants }: HeroContentProps) => {
  return (
    <motion.div
      className="max-w-5xl mx-auto text-center"
      variants={variants.container}
      initial="hidden"
      animate="visible"
    >
      <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex flex-wrap items-end justify-center gap-2">
            <motion.span variants={variants.sleek} className="inline-block">
              Sleek,
            </motion.span>
            <motion.span variants={variants.fast} className="inline-block">
              fast
            </motion.span>
            <motion.div className="relative -translate-y-2 inline-block" variants={variants.trafficLight}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg object-cover w-20 h-8"
              >
                <source src="/images/sonic-fast.webm" type="video/webm" />
              </video>
            </motion.div>
            <motion.span variants={variants.and} className="inline-block">
              and
            </motion.span>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-2 mt-2">
            <motion.span variants={variants.ghostText} className="inline-block">
              doesn't ghost you
            </motion.span>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-2 mt-2">
            <motion.span variants={variants.ghostText} className="inline-block">
              after launch
            </motion.span>
            <motion.div className="relative -translate-y-2 inline-block" variants={variants.animeMobile}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg object-cover w-8 h-8"
              >
                <source src="/images/anime-launch.webm" type="video/webm" />
              </video>
            </motion.div>
            <motion.span
              initial={{
                opacity: 0,
                scale: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: [0, 1.5, 1],
                y: 0,
              }}
              transition={{
                delay: 6.2,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  times: [0, 0.8, 1],
                  duration: 0.4,
                },
              }}
              className="inline-block"
            >
              .
            </motion.span>
          </div>
        </div>

        {/* Tablet & Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex flex-wrap items-end justify-center gap-2 md:gap-3 lg:gap-4">
            <motion.span variants={variants.sleek} className="inline-block">
              Sleek,
            </motion.span>
            <motion.span variants={variants.fast} className="inline-block">
              fast
            </motion.span>
            <motion.div className="relative -translate-y-2 inline-block" variants={variants.trafficLight}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg object-cover sm:w-28 sm:h-10 md:w-32 md:h-12 lg:w-40 lg:h-16"
              >
                <source src="/images/sonic-fast.webm" type="video/webm" />
              </video>
            </motion.div>
            <motion.span variants={variants.and} className="inline-block">
              and
            </motion.span>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-2 md:gap-3 lg:gap-4 mt-2">
            <motion.span variants={variants.ghostText} className="inline-block">
              doesn't ghost you after launch
            </motion.span>
            <motion.div className="relative -translate-y-2 inline-block" variants={variants.anime}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg object-cover sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
              >
                <source src="/images/anime-launch.webm" type="video/webm" />
              </video>
            </motion.div>
            <motion.span
              initial={{
                opacity: 0,
                scale: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: [0, 1.5, 1],
                y: 0,
              }}
              transition={{
                delay: 5.8,
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  times: [0, 0.8, 1],
                  duration: 0.4,
                },
              }}
              className="inline-block"
            >
              .
            </motion.span>
          </div>
        </div>
      </div>

      <motion.p
        className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
        variants={variants.subtitle}
      >
        We help creators and businesses turn bold ideas into digital reality with smart technology, reliable systems,
        and creative support every step of the way
      </motion.p>
      
      {/* CTA Button */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          delay: 6.8,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 px-4 sm:px-0"
      >
        <motion.button
          type="button"
          className="group relative inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-auto"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
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
          {/* Background gradient animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* Button content */}
          <span className="relative z-10 flex items-center gap-3">
            Book a Call
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-1 transition-transform duration-300"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
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

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{
              scale: 2,
              opacity: [0, 0.3, 0],
              transition: { duration: 0.4 },
            }}
          />
        </motion.button>
      </motion.div>

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
          delay: 7.4,
          duration: 0.6,
        }}
        className="mt-4 text-sm text-gray-500"
      >
        Free 30-minute consultation • No commitment required
      </motion.p>
    </motion.div>
  );
};
