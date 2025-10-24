"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { ReactNode } from 'react'

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      } as any)

      const raf = (time: number) => {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenisRef.current?.destroy()
      }
    }
  }, [])

  return <>{children}</>
}