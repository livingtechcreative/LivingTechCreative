"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import BadgeSubtitle from "./badge-subtitle"
import Image from "next/image"
import { useState } from "react"
import { RetroGrid } from "./ui/retro-grid"
import { OptimizedIcon } from "./ui/optimized-icon"
import { useMobileIcon } from "@/hooks/use-mobile-icon"

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10
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

const descriptionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0 0 100% 0)"
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const { getIconSrc } = useMobileIcon()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index)
  }
  
  const services = [
    {
      title: "UI/UX Design",
      description: "Craft intuitive, user-friendly interfaces that captivate and engage your audience with seamless user experiences.",
      icon: "/icons/uiuxdesign.svg",
    },
    {
      title: "No-Code Development",
      description: "Launch powerful apps and platforms quickly with cutting-edge no-code solutions like Bubble, Webflow, and Adalo.",
      icon: "/icons/nocode.svg",
    },
    {
      title: "Website Development",
      description: "Build responsive, high-performance websites with modern frameworks like Next.js, React, and Node.js tailored to your business goals.",
      icon: "/icons/webdev.svg",
    },
    {
      title: "Data Analysis",
      description: "Transform raw data into actionable insights using advanced analytics tools and visualization techniques for informed decision-making.",
      icon: "/icons/dataanalys.svg",
    },
    {
      title: "Data Science",
      description: "Harness machine learning and statistical modeling to unlock predictive insights and drive data-driven business strategies.",
      icon: "/icons/datascience.svg",
    },
    {
      title: "Graphic Design",
      description: "Create stunning visual communications that capture your brand essence, from logos and marketing materials to digital assets.",
      icon: "/icons/graphicdesign.svg",
    },
    {
      title: "Video Editing",
      description: "Produce compelling video content with professional editing, motion graphics, and storytelling that captivates your audience.",
      icon: "/icons/videoediting.svg",
    },
    {
      title: "Branding",
      description: "Develop a cohesive, memorable brand identity with strategic positioning, visual systems, and messaging that builds trust and recognition.",
      icon: "/icons/branding.svg",
    },
  ]

  return (
    <motion.section 
      id="services" 
      className="bg-white py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Retro Grid Background */}
      <motion.div 
        className="absolute inset-0 h-96"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <RetroGrid 
          angle={65}
          cellSize={60}
          opacity={0.8}
          lightLineColor="#9ca3af"
          darkLineColor="#374151"
        />
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-left mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4"
            variants={textVariants}
          >
            <BadgeSubtitle>Services</BadgeSubtitle>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            variants={textVariants}
          >
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span>What We</span>
              <motion.div
                className="relative inline-block mx-1"
                variants={iconVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <OptimizedIcon
                  src={getIconSrc("/images/paint.svg", "/images/paint.png")}
                  alt="paint icon"
                  variants={iconVariants}
                />
              </motion.div>
              <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                Do for You
              </span>
            </div>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed"
            variants={textVariants}
          >
            At Living Tech Creative, we offer comprehensive digital solutions from concept to execution.
            We combine cutting-edge technology with creative excellence to deliver results that drive your business forward.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y divide-gray-100/50 sm:divide-y-0 sm:divide-x divide-gray-100/50"
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const isActive = activeCard === index
            const descriptionRef = useRef<HTMLDivElement>(null)
            const isDescriptionInView = useInView(descriptionRef, { once: true, margin: "-50px" })

            return (
              <motion.div
                key={index}
                className="group relative p-4 sm:p-6 lg:p-8 cursor-pointer overflow-hidden transition-all duration-500"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.3, ease: "easeOut" } }}
                onClick={() => handleCardClick(index)}
              >
                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#2B35AB]/3 via-[#8A38F5]/3 to-[#13CBD4]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                />
                {/* Service Content */}
                <div className="relative z-10">
                  {/* Service Icon */}
                  <motion.div
                    className="mb-6 sm:mb-8"
                    variants={iconVariants}
                  >
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center">
                    {/* Subtle icon background - only visible on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#2B35AB]/5 via-[#8A38F5]/5 to-[#13CBD4]/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                      whileHover={{
                        scale: 1.05,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 flex items-center justify-center">
                      <OptimizedIcon
                        src={service.icon || "/placeholder.svg"}
                        alt={service.title}
                        variants={iconVariants}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Service Content */}
                <motion.div variants={textVariants} className="text-left">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:from-[#2B35AB] group-hover:via-[#8A38F5] group-hover:to-[#13CBD4] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {service.title}
                  </h3>
                  {/* Hide description on desktop, show on mobile */}
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base transition-all duration-300 block lg:hidden lg:group-hover:block lg:opacity-0 lg:h-0 lg:group-hover:opacity-100 lg:group-hover:h-auto lg:mt-2">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
