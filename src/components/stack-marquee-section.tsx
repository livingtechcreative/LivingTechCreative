"use client"

import { motion } from "framer-motion"
import BadgeSubtitle from "./badge-subtitle"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const marqueeVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function StackMarqueeSection() {
  const imageLines = [
    { src: "/images/line1.svg", alt: "Tech Stack Line 1" },
    { src: "/images/line2.svg", alt: "Tech Stack Line 2" },
    { src: "/images/line3.svg", alt: "Tech Stack Line 3" },
  ]

  return (
    <motion.section 
      className="bg-white py-32 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4"
            variants={textVariants}
          >
            <BadgeSubtitle>Tech Stack</BadgeSubtitle>
          </motion.div>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            variants={textVariants}
          >
            The tools that accompany our workflow.
          </motion.h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="space-y-8"
          variants={containerVariants}
        >
          {imageLines.map((line, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="flex overflow-hidden rounded-lg"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
              variants={marqueeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: lineIndex * 0.2 }}
            >
              <div
                className={`flex gap-6 ${lineIndex % 2 === 0 ? "animate-marquee-right" : "animate-marquee-left"}`}
                style={{
                  width: "max-content",
                }}
              >
                {/* Duplicate the image multiple times for seamless loop */}
                {[...Array(3)].map((_, duplicateIndex) => (
                  <motion.img
                    key={`${lineIndex}-${duplicateIndex}`}
                    src={line.src}
                    alt={line.alt}
                    className="h-16 sm:h-16 w-auto flex-shrink-0 scale-125 sm:scale-100"
                    style={{
                      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                    }}
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: lineIndex * 0.2 + duplicateIndex * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
      `}</style>
    </motion.section>
  )
}