import { motion } from "framer-motion"
import BadgeSubtitle from "./badge-subtitle"
import Image from "next/image"
import { useState } from "react"
import { RetroGrid } from "./ui/retro-grid"

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
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.3
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
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
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

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index)
  }
  
  const services = [
    {
      title: "UI/UX Design",
      description: "Craft intuitive, user-friendly interfaces that captivate and engage your audience.",
      icon: "/icons/uiuxdesign.svg",
    },
    {
      title: "No-Code Development",
      description: "Launch apps and platforms quickly with cutting-edge no-code solutions.",
      icon: "/icons/nocode.svg",
    },
    {
      title: "Website Development",
      description: "Build responsive, high-performance websites tailored to your business goals.",
      icon: "/icons/webdev.svg",
    },
    {
      title: "Data Analysis",
      description: "Build responsive, high-performance websites tailored to your business goals.",
      icon: "/icons/dataanalys.svg",
    },
    {
      title: "Data Science",
      description: "Harness advanced analytics and modeling to unlock actionable insights.",
      icon: "/icons/datascience.svg",
    },
    {
      title: "Graphic Design",
      description:
        "Creative that speaks with the human spirit. From concept to final design, we create visual solutions.",
      icon: "/icons/graphicdesign.svg",
    },
    {
      title: "Video Editing",
      description: "From concept idea to finished work, we craft video content that tells your story.",
      icon: "/icons/videoediting.svg",
    },
    {
      title: "Branding",
      description: "Develop a cohesive, memorable brand identity that resonates and builds trust.",
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
          className="text-center mb-16"
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
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <span>What We</span>
              <motion.div 
                className="relative inline-block mx-1"
                variants={iconVariants}
                whileHover="hover"
              >
                <Image
                  src="/images/paint.svg"
                  alt="paint icon"
                  width={40}
                  height={40}
                  className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
              </motion.div>
              <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                Do for You
              </span>
            </div>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed"
            variants={textVariants}
          >
            At Living Tech, we offer a suite of digital services designed to help your brand grow effectively and with
            intention. We don't just create; we elevate, with the goal of long-term success.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const isActive = activeCard === index
            return (
              <motion.div
                key={index}
                className="group bg-transparent rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCardClick(index)}
              >
                {/* Service Icon */}
                <motion.div 
                  className="mb-4 sm:mb-6"
                  variants={iconVariants}
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img
                      src={service.icon || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-contain"
                      style={{ 
                        filter: 'drop-shadow(0 0 0 transparent)',
                        boxShadow: 'none'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Service Content */}
                <motion.div variants={textVariants}>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  {/* Desktop: Hover behavior, Mobile: Click behavior */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isActive ? 'max-h-32' : 'max-h-0 sm:group-hover:max-h-32'
                  }`}>
                    <p className={`text-gray-600 leading-relaxed transition-opacity duration-300 delay-100 pt-2 text-xs sm:text-sm lg:text-base ${
                      isActive ? 'opacity-100' : 'opacity-0 sm:group-hover:opacity-100'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
