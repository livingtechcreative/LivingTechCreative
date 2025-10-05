"use client"

import { useState, useRef } from "react"
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
    hoverimage?: string
    linkedinUrl?: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const animationFrameRef = useRef<number | null>(null)

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const target = event.currentTarget
      if (!target) return // Null safety check
      
      const rect = target.getBoundingClientRect()
      if (!rect || rect.width === 0) return // Additional safety check
      
      const offsetX = event.clientX - rect.left
      const halfWidth = rect.width / 2
      x.set(offsetX - halfWidth)
    })
  }

  const handleClick = (itemId: number, linkedinUrl?: string) => {
    if (linkedinUrl) {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer")
    } else if (hoveredIndex === itemId) {
      setHoveredIndex(null)
    } else {
      setHoveredIndex(itemId)
    }
  }

  return (
    <>
      {items.map((item) => (
                 <div
           className="group relative -mr-4"
           key={item.name}
           onMouseEnter={() => setHoveredIndex(item.id)}
           onMouseLeave={() => setHoveredIndex(null)}
           onClick={() => handleClick(item.id, item.linkedinUrl)}
           style={{ cursor: item.linkedinUrl ? 'pointer' : 'default' }}
         >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-56 -left-24 z-50 flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-xl w-47">
                <Image src={item.hoverimage || `/memberhover/${item.name.toLowerCase().split(' ')[0]}.jpg`} alt={item.name} width={192} height={192} className="w-48 h-48 object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
    </>
  )
}
