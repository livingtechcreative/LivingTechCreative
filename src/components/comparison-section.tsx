import { motion } from "framer-motion"
import Image from "next/image"
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
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
}

const tableVariants = {
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

const rowVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    x: 5,
    transition: {
      duration: 0.2
    }
  }
}

export default function ComparisonSection() {
  const comparisonData = [
    {
      category: "Education",
      livingTech: "In-depth tech and strategy training for students.",
      others: "Basic guidance, rarely structured.",
    },
    {
      category: "Custom Pricing",
      livingTech: "Tailored packages, flexible, no hidden costs",
      others: "Fixed or subscription plans, less flexible.",
    },
    {
      category: "Speed",
      livingTech: "Projects done in 12-48 hours with top quality.**",
      others: "Slower delivery, often 1-2 days or more.",
    },
    {
      category: "Quality",
      livingTech: "High-quality designs via global talent and AI.",
      others: "Varying quality, limited by tech or team size.",
    },
    {
      category: "Post-Launch Support",
      livingTech: "24/7 support, no ghosting, sustained engagement.",
      others: "Limited support, focus on new projects",
    },
  ]

  return (
    <motion.section 
      className="bg-white pt-40 pb-24 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4 text-left"
            variants={textVariants}
          >
            <BadgeSubtitle>Advantages</BadgeSubtitle>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <motion.div 
              className="text-left"
              variants={textVariants}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-none"
                variants={textVariants}
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span>Why</span>
                  <motion.div 
                    className="relative inline-block"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Image
                      src="/images/Handsake.svg"
                      alt="Handshake"
                      width={56}
                      height={56}
                      className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                    />
                  </motion.div>
                  <span 
                    className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent" 
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #2B35AB 0%, #8A38F5 46%, #13CBD4 90%)'
                    }}
                  >
                    Partner
                  </span>
                </div>
                <div>with Us?</div>
              </motion.h2>
            </motion.div>
            <motion.div 
              className="flex items-center"
              variants={textVariants}
            >
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Delivering impact, not just ideas. At our core, we believe great work should drive real results. Because
                we don&apos;t just work for you, we grow with you.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Table - Hidden on Mobile */}
        <motion.div 
          className="hidden sm:block overflow-hidden rounded-2xl border border-gray-200"
          variants={tableVariants}
        >
          <table className="w-full">
            {/* Header Row */}
            <thead>
              <motion.tr
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <th className="bg-white p-6 text-left font-semibold text-gray-900 border-r border-gray-200">
                  Comparison
                </th>
                <th className="bg-white p-6 text-left border-r border-gray-200">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src="/images/logos.svg" 
                        alt="Living Tech Creative" 
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </motion.div>
                    <span className="font-semibold text-black">Living Tech Creative</span>
                  </div>
                </th>
                <th className="bg-white p-6 text-left font-semibold text-gray-900">Other Agencies</th>
              </motion.tr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisonData.map((item, index) => (
                <motion.tr 
                  key={index} 
                  className="border-t border-gray-200"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  <td className="bg-white p-6 font-medium text-gray-900 border-r border-gray-200">{item.category}</td>
                  <td className="bg-gray-50 p-6 border-r border-gray-200">
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </motion.div>
                      <p className="text-sm text-gray-700">{item.livingTech}</p>
                    </div>
                  </td>
                  <td className="bg-white p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0 mt-1"></div>
                      <p className="text-sm text-gray-600">{item.others}</p>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Table */}
        <motion.div 
          className="sm:hidden overflow-hidden rounded-2xl border border-gray-200"
          variants={tableVariants}
        >
          <table className="w-full">
            {/* Header Row */}
            <thead>
              <motion.tr
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <th className="bg-white p-4 text-left font-semibold text-gray-900 border-r border-gray-200 text-sm">
                  Comparison
                </th>
                <th className="bg-white p-4 text-left border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image 
                        src="/images/logos.svg" 
                        alt="Living Tech Creative" 
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </motion.div>
                    <span className="font-semibold text-black text-sm">Living Tech Creative</span>
                  </div>
                </th>
                <th className="bg-white p-4 text-left font-semibold text-gray-900 text-sm">Other Agencies</th>
              </motion.tr>
            </thead>

            {/* Body Rows */}
            <tbody>
              {comparisonData.map((item, index) => (
                <motion.tr 
                  key={index} 
                  className="border-t border-gray-200"
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover="hover"
                >
                  <td className="bg-white p-4 font-medium text-gray-900 border-r border-gray-200 text-sm">{item.category}</td>
                  <td className="bg-gray-50 p-4 border-r border-gray-200">
                    <div className="flex items-start gap-2">
                      <motion.div 
                        className="w-3 h-3 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </motion.div>
                      <p className="text-xs text-gray-700">{item.livingTech}</p>
                    </div>
                  </td>
                  <td className="bg-white p-4">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0 mt-1"></div>
                      <p className="text-xs text-gray-600">{item.others}</p>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.section>
  )
}
