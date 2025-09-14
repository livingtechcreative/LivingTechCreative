import { motion } from "framer-motion"
import Image from "next/image"
import BadgeSubtitle from "./badge-subtitle"
import { AnimatedTooltip } from "./ui/animated-tooltip"

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

const imageVariants = {
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
      duration: 0.6
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
}

export default function AboutUsSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Danisa Rahadian Abimanyu",
      designation: "Team Lead",
      image: "/member/danisa.jpg",
      hoverimage: "/memberhover/danisa.jpg",
    },
    {
      id: 2,
      name: "Wachid Muslih",
      designation: "UI/UX Designer",
      image: "/member/wachid.jpg",
      hoverimage: "/memberhover/wachid.jpg",
    },
    {
      id: 3,
      name: "Muhammad Anshori Akbar",
      designation: "Backend Developer",
      image: "/member/anshori.jpg",
      hoverimage: "/memberhover/anshori.jpg",
    },
    {
      id: 4,
      name: "Satria Wibuana Mahardika",
      designation: "Graphic Designer",
      image: "/member/satria.jpg",
      hoverimage: "/memberhover/satria.jpg",
    },
    {
      id: 5,
      name: "Fakhri Abdillah",
      designation: "Fullstack Developer",
      image: "/member/fakri.jpg",
      hoverimage: "/memberhover/fakri.jpg",
    },
  ]

  return (
    <motion.section 
      id="about" 
      className="bg-white py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="mb-6"
              variants={textVariants}
            >
              <BadgeSubtitle>About Us</BadgeSubtitle>
            </motion.div>
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8"
              variants={textVariants}
            >
              <div className="flex flex-wrap items-center gap-2">
                <motion.div 
                  className="relative inline-block"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <Image
                    src="/images/handwaves.svg"
                    alt="Hand Wave"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </motion.div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Hello
                </span>
                <span>. We are</span>
              </div>
              <span className="text-gray-900">Living Tech</span>
              <br />
              <span className="text-gray-900">Creative</span>
            </motion.h1>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
          >
            {/* Two column text content */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-8"
              variants={itemVariants}
            >
              <motion.div
                variants={textVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why we showed up</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Founded for you to be friends, accompanying you in every step of your business journey. Through
                  digitals, we also come to empower people through education, creating impact beyond our imagination.
                </p>
              </motion.div>
              <motion.div
                variants={textVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Focus and Work</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We specialize in crafting seamless digital experiences that resonate with your audience. We aim
                  businesses to build solutions that not only address your current needs but outcomes.
                </p>
              </motion.div>
            </motion.div>

            {/* Team Section */}
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-3"
                variants={textVariants}
              >
                Meet the Persona Behind Our Work
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-sm sm:text-base mb-8"
                variants={textVariants}
              >
                Get to know our passionate team, the driving force behind every project.
              </motion.p>

              {/* Team Member Avatars */}
              <motion.div 
                className="flex justify-start"
                variants={textVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedTooltip items={teamMembers} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
