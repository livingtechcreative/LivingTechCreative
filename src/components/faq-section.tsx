"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, MoreVertical } from "lucide-react"
import { useState, useRef, useEffect } from "react"
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
  }
}

const faqVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
}

const answerVariants = {
  hidden: { 
    opacity: 0, 
    height: 0 
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const faqs = [
    {
      question: "What industries do you serve?",
      answer: "We work across various industries including technology, healthcare, finance, e-commerce, and more.",
    },
    {
      question: "Can you work with startups or small businesses?",
      answer: "We work with businesses of all sizes, from startups to established enterprises.",
    },
    {
      question: "How do I get started with Living Tech Creative?",
      answer:
        "Simply reach out through our contact form or schedule a consultation call to discuss your project needs.",
    },
    {
      question: "How much do your services cost?",
      answer:
        "Our pricing varies based on project scope and requirements. We provide custom quotes after understanding your specific needs.",
    },
    {
      question: "What if I&apos;m not satisfied with the results?",
      answer:
        "We offer revisions and work closely with you to ensure the final result meets your expectations and business goals.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer various maintenance and support packages to keep your digital solutions running smoothly.",
    },
    {
      question: "Does Living Tech Creative offer any courses or training?",
      answer:
        "We occasionally offer workshops and training sessions. Follow us on social media for updates on upcoming educational opportunities.",
    },
    {
      question: "What are the working hours of Living Tech Creative?",
      answer:
        "We typically work Monday to Friday, 9 AM to 6 PM. However, we're flexible and can accommodate different time zones for our clients.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleBackClick = () => {
    setActiveIndex(null)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.section 
      id="faq" 
      className="relative bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Header */}
          <motion.div 
            className="lg:sticky lg:top-8"
            variants={itemVariants}
          >
            <motion.div 
              className="mb-6"
              variants={textVariants}
            >
              <BadgeSubtitle>Frequently Ask Question</BadgeSubtitle>
            </motion.div>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
              variants={textVariants}
            >
              <div className="flex flex-wrap items-center gap-4">
                <motion.div 
                  className="relative inline-block"
                  variants={iconVariants}
                >
                  <Image
                    src="/images/chat.svg"
                    alt="Chat"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </motion.div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Ask
                </span>
                <span>Us Anything,</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span>We've</span>
                <span className="text-gray-900">
                  Got
                </span>
                <motion.div 
                  className="relative inline-block"
                  variants={iconVariants}
                >
                  <Image
                    src="/images/people.svg"
                    alt="People"
                    width={56}
                    height={56}
                    className="rounded-lg object-cover w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </motion.div>
              </div>
              <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                the Answers
              </span>
            </motion.h2>
          </motion.div>

          {/* Right Column - Chat Interface */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.div 
              className="w-full max-w-md"
              variants={cardVariants}
            >
              {/* Chat Interface */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
                {/* Gradient Background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-blue-200 opacity-30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />

                {/* Chat Header */}
                <motion.div 
                  className="relative bg-white px-4 py-4 border-b border-gray-100"
                  variants={textVariants}
                >
                  <div className="flex items-center justify-between">
                    <motion.button 
                      onClick={handleBackClick} 
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white text-xs font-bold">TC</span>
                      </motion.div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {activeIndex !== null ? "Us ❤️" : "Our Client ❤️"}
                        </div>
                        <div className="text-xs text-green-500">Online Now</div>
                      </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                      <motion.button 
                        onClick={toggleDropdown} 
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </motion.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {showDropdown && (
                          <motion.div 
                            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-4 px-4 z-10"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-sm text-gray-600 text-center leading-relaxed">
                              What do you expect to find here? 
                              <br />
                              <span className="text-xs text-gray-400 mt-1 block">
                                Maybe some chat options or settings?
                              </span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* Today Badge */}
                <motion.div 
                  className="relative px-4 py-2"
                  variants={textVariants}
                >
                  <div className="flex justify-center">
                    <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">Today</span>
                  </div>
                </motion.div>

                {/* Chat Content */}
                <motion.div 
                  className="relative p-4 space-y-3 min-h-[600px]"
                  variants={containerVariants}
                >
                  {faqs.map((faq, index) => (
                    <motion.div 
                      key={index} 
                      className="space-y-2"
                      variants={faqVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Question */}
                      <motion.button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-start gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-gray-300/50 transition-all text-left group shadow-sm"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <motion.div 
                          className="flex-shrink-0 mt-0.5"
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {activeIndex === index ? (
                            <Minus className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Plus className="w-4 h-4 text-gray-600" />
                          )}
                        </motion.div>
                        <span className="text-sm font-medium text-gray-900 leading-relaxed">{faq.question}</span>
                      </motion.button>

                      {/* Answer */}
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            variants={answerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="overflow-hidden"
                          >
                            <div className="bg-blue-500/90 backdrop-blur-sm text-white p-3 rounded-xl ml-7 shadow-sm">
                              <p className="text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
