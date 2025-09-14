"use client"

import { motion } from "framer-motion"

const marqueeVideos = [
  { src: "/marquee/a.webm", alt: "Marquee video A" },
  { src: "/marquee/b.webm", alt: "Marquee video B" },
  { src: "/marquee/c.webm", alt: "Marquee video C" },
  { src: "/marquee/d.webm", alt: "Marquee video D" },
  { src: "/marquee/e.webm", alt: "Marquee video E" },
  { src: "/marquee/f.webm", alt: "Marquee video F" },
]

export default function HeroMarqueeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="w-full overflow-hidden bg-gray-50 mt-32"
    >
      <div className="relative">
        {/* Gradient overlays for fade effect - positioned at screen edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

        {/* Marquee container */}
        <div className="flex">
          {/* First set of cards */}
          <motion.div
            className="flex"
            animate={{
              x: [0, -100 * marqueeVideos.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {marqueeVideos.map((video, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 h-48 sm:w-96 sm:h-56 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80 rounded-2xl mx-4 overflow-hidden border-2 border-black/20 hover:border-black/40 transition-all duration-300"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.warn(`Video failed to load: ${video.src}`)
                    // Hide the video element if it fails to load
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.style.backgroundColor = '#f3f4f6'
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-500 text-sm">Video not available</span></div>'
                    }
                  }}
                >
                  <source src={video.src} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </motion.div>

          {/* Second set of cards for seamless loop */}
          <motion.div
            className="flex"
            animate={{
              x: [0, -100 * marqueeVideos.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {marqueeVideos.map((video, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 h-48 sm:w-96 sm:h-56 md:w-[28rem] md:h-72 lg:w-[32rem] lg:h-80 rounded-2xl mx-4 overflow-hidden border-2 border-black/20 hover:border-black/40 transition-all duration-300"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.warn(`Video failed to load: ${video.src}`)
                    // Hide the video element if it fails to load
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.style.backgroundColor = '#f3f4f6'
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-500 text-sm">Video not available</span></div>'
                    }
                  }}
                >
                  <source src={video.src} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}