"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface OptimizedIconProps {
  src: string
  alt: string
  size?: number
  className?: string
  variants?: any
  priority?: boolean
}

export function OptimizedIcon({ 
  src, 
  alt, 
  size = 32, 
  className = "",
  variants = {},
  priority = false
}: OptimizedIconProps) {
  const isSvg = src.endsWith('.svg')
  
  // Jika SVG, konversi ke PNG atau gunakan wrapper khusus
  if (isSvg) {
    return (
      <motion.div 
        className={`relative inline-block overflow-hidden optimized-icon ${className}`}
        variants={variants}
        style={{ width: size, height: size }}
        data-icon-type="svg"
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-contain w-full h-full"
          priority={priority}
          unoptimized={true} // Untuk SVG, kita gunakan unoptimized
        />
      </motion.div>
    )
  }
  
  // Jika PNG/JPG, gunakan Image seperti biasa
  return (
    <motion.div 
      className={`relative inline-block overflow-hidden ${className}`}
      variants={variants}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain w-full h-full"
        priority={priority}
      />
    </motion.div>
  )
}

// Wrapper khusus untuk icon di heading/banner
export const BannerIcon = ({ 
  src, 
  alt, 
  size = 32,
  className = "",
  variants 
}: { 
  src: string
  alt: string
  size?: number
  className?: string
  variants?: any
}) => {
  return (
    <motion.div 
      className={`relative inline-block overflow-hidden optimized-banner-icon ${className}`}
      variants={variants}
      style={{ width: size, height: size }}
      data-icon-type={src.endsWith('.svg') ? "svg" : "png"}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain w-full h-full"
        unoptimized={src.endsWith('.svg')}
      />
    </motion.div>
  )
}