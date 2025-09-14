"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Target, Map, Lightbulb, Users, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import BadgeSubtitle from "./badge-subtitle"
import PhoneInput from "./phone-input"
import { apiService, ContactFormData } from "@/lib/api"

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

const formVariants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3
    }
  }
}

const benefitVariants = {
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
  }
}

interface FormData {
  firstName: string
  email: string
  phoneNumber: string
  message: string
  referralSource: string
}

export default function ContactSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    email: "",
    phoneNumber: "",
    message: "",
    referralSource: "",
  })


  const benefits = [
    {
      icon: <Target className="w-4 h-4 text-white" />,
      title: "Personalized Strategy Insights",
      description:
        "A tailored discussion to align our digital solutions with your specific business goals and challenges.",
    },
    {
      icon: <Map className="w-4 h-4 text-white" />,
      title: "Clear Project Roadmap",
      description:
        "A detailed outline of how we can bring your vision to life, including timelines and key milestones.",
    },
    {
      icon: <Lightbulb className="w-4 h-4 text-white" />,
      title: "Creative Inspiration",
      description: "Innovative ideas from our team to elevate your brand and create impactful digital experiences.",
    },
    {
      icon: <Users className="w-4 h-4 text-white" />,
      title: "Dedicated Partnership",
      description:
        "A commitment from our team to guide you with expertise, ensuring a collaborative and results-driven process.",
    },
  ]

  const referralOptions = ["Internet", "Instagram", "Tiktok", "Youtube", "Facebook", "Friends", "College", "Other"]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSubmitStatus('idle')
    setErrorMessage('')
    setFormData({
      firstName: "",
      email: "",
      phoneNumber: "",
      message: "",
      referralSource: "",
    })
  }

  const handleSubmit = async () => {
    if (!isStep1Valid || !isStep2Valid) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const contactFormData: ContactFormData = {
        name: formData.firstName,
        email: formData.email,
        phone: formData.phoneNumber,
        message: formData.message,
        information_source: formData.referralSource,
      }

      await apiService.submitContactForm(contactFormData)
      setSubmitStatus('success')
      setCurrentStep(3) // Show success step
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = formData.firstName && formData.email && formData.phoneNumber && formData.message
  const isStep2Valid = formData.referralSource

  return (
    <motion.section 
      id="contact" 
      className="bg-white pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="mb-4"
            variants={textVariants}
          >
            <BadgeSubtitle>Contact Us</BadgeSubtitle>
          </motion.div>
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            variants={textVariants}
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <span>Time to Stop Scrolling,</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
              <span>Let&apos;s</span>
              <motion.div 
                className="relative inline-block mx-1"
                variants={iconVariants}
              >
                <Image 
                  src="/images/hand.svg" 
                  alt="Hand" 
                  width={56}
                  height={56}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14" 
                />
              </motion.div>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 bg-clip-text text-transparent">
                Discuss
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
              <span>and Cook It Up!</span>
            </div>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            variants={textVariants}
          >
            We&apos;re here to listen. Book a meeting with our team to discuss your vision, explore possibilities, and start
            creating something.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mx-auto">
          {/* Left Column - Benefits */}
          <motion.div 
            className="relative bg-black rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 text-white overflow-hidden min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
            variants={cardVariants}
          >
            {/* Gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/50 to-cyan-400/30 pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            <motion.div 
              className="relative z-10"
              variants={containerVariants}
            >
              <motion.h3 
                className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8"
                variants={textVariants}
              >
                What Will You Get in Meeting
              </motion.h3>
              <motion.div 
                className="space-y-4 sm:space-y-6"
                variants={containerVariants}
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-3 sm:gap-4"
                    variants={benefitVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 mt-0.5 sm:mt-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] flex items-center justify-center">
                          {benefit.icon}
                        </div>
                      </div>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{benefit.title}</h4>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
            variants={cardVariants}
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div 
                  className="space-y-4 sm:space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <motion.div 
                      className="relative"
                      variants={textVariants}
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                        <span className="relative inline-block">
                          Pop
                          <motion.img 
                            src="/images/paperplane.svg" 
                            alt="Paper plane" 
                            className="absolute top-0 left-1 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 z-10 transform rotate-12" 
                            animate={{ 
                              x: [0, 5, 0],
                              rotate: [12, 15, 12]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </span>
                        {" "}Us a
                      </h3>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Message</h3>
                    </motion.div>
                    <span className="text-xs sm:text-sm text-gray-500">1 of 2 Steps</span>
                  </div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Fullname</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Vederico Van Basten"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
                    />
                  </motion.div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="vederico@example.mail"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
                    />
                  </motion.div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number</label>
                    <PhoneInput
                      onChange={(value) => handleInputChange("phoneNumber", value)}
                      placeholder="81234567890"
                    />
                  </motion.div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project..."
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all duration-200 resize-none text-sm sm:text-base"
                    />
                  </motion.div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={handleNext}
                      disabled={!isStep1Valid}
                      className="w-full bg-gray-900 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Next Step
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Referral Source */}
              {currentStep === 2 && (
                <motion.div 
                  className="space-y-4 sm:space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <motion.div 
                      className="relative"
                      variants={textVariants}
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                        <span className="relative inline-block">
                          How Did You
                          <motion.img 
                            src="/images/paperplane.svg" 
                            alt="Paper plane" 
                            className="absolute top-0 left-1 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 z-10 transform rotate-12" 
                            animate={{ 
                              x: [0, 5, 0],
                              rotate: [12, 15, 12]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </span>
                        {" "}Find Us?
                      </h3>
                    </motion.div>
                    <span className="text-xs sm:text-sm text-gray-500">2 of 2 Steps</span>
                  </div>

                  <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4">Referral Source</label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {referralOptions.map((option, index) => (
                        <motion.button
                          key={option}
                          onClick={() => handleInputChange("referralSource", option)}
                          className={`p-2 sm:p-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                            formData.referralSource === option
                              ? "border-gray-900 bg-gray-900 text-white"
                              : "border-gray-300 text-gray-700 hover:border-gray-400"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <motion.button
                      onClick={handleBack}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                      Back
                    </motion.button>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!isStep2Valid || isSubmitting}
                      className="flex-1 bg-gray-900 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                      {!isSubmitting && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div 
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Submission Failed</p>
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {currentStep === 3 && submitStatus === 'success' && (
                <motion.div 
                  className="text-center space-y-4 sm:space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Message Sent Successfully!
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm sm:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Thank you for reaching out! We&apos;ll get back to you within 24 hours.
                  </motion.p>
                  
                  <motion.button
                    onClick={handleReset}
                    className="bg-gray-900 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
