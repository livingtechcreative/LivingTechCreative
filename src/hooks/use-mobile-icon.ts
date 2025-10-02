"use client"

import { useState, useEffect } from 'react'

interface UseMobileIconReturn {
  isMobile: boolean
  getIconSrc: (svgPath: string, pngPath: string) => string
}

export function useMobileIcon(): UseMobileIconReturn {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Tailwind's md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getIconSrc = (svgPath: string, pngPath: string): string => {
    return isMobile ? pngPath : svgPath
  }

  return { isMobile, getIconSrc }
}