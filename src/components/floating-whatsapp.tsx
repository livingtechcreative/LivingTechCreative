"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface FloatingWhatsAppProps {
  phoneNumber?: string
  message?: string
}

export default function FloatingWhatsApp({ 
  phoneNumber = "6281234567890", // Default Indonesian number format
  message = "Hello! I'm interested in your services."
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ 
          boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6" />
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500 opacity-75"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Tooltip */}
        <motion.div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
