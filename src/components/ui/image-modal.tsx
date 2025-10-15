"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import Image from "next/image"
import { normalizeImagePath } from "@/lib/utils"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
}

export default function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isClient) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image container */}
            <div className="relative max-w-5xl max-h-[85vh] w-full">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={normalizeImagePath(imageSrc)}
                  alt={alt}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg"
                  unoptimized={normalizeImagePath(imageSrc).includes('livingtechcreative.com')}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ImageWithModalProps {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
}

export function ImageWithModal({ src, alt, className, children }: ImageWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className={`relative group cursor-pointer ${className}`} onClick={openModal}>
        {children}
        {/* Magnifying glass icon - only visible on desktop on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:flex">
          <div className="p-3 bg-black/70 rounded-full">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={src}
        alt={alt}
      />
    </>
  )
}