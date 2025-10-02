"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BannerIcon } from "./ui/optimized-icon"
import { useMobileIcon } from "@/hooks/use-mobile-icon"
import React from "react"

interface CTABannerProps {
  className?: string
  backgroundImageUrl?: string
  compact?: boolean // smaller paddings/sizes for detail pages
}

export default function CTABanner({
  className = "",
  backgroundImageUrl = "/images/bgbanner.png",
  compact = false,
}: CTABannerProps) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
  const { getIconSrc } = useMobileIcon()

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat w-full"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            minHeight: compact ? "180px" : "200px",
          }}
        >
          <div className={compact ? "relative px-6 sm:px-12 py-6 sm:py-8 text-left" : "relative px-8 sm:px-12 py-8 text-left"}>
            <h2 className={compact ? "text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight" : "text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight"}>
              <span className="block">Time to Stop Scrolling,</span>
              <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                <span className="flex items-center gap-2">
                  <b className="font-bold">Let&apos;s</b>
                  <BannerIcon 
                    src={getIconSrc("/images/hand.svg", "/images/hand.png")} 
                    alt="Hand" 
                    className={`${compact ? "w-6 h-6 sm:w-8 sm:h-8" : "w-8 h-8"} hidden sm:inline-block`}
                  />
                  <span className="bg-gradient-to-r from-[#8A38F5] via-[#13CBD4] to-[#2B35AB] bg-clip-text text-transparent font-bold">
                    Book a meeting
                  </span>
                </span>
                <b className="font-bold">and discuss it!</b>
              </span>
            </h2>
            <p className={compact ? "text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-xl" : "text-white/90 text-base mb-6 max-w-xl"}>
              We&apos;re here to listen. Book a meeting with our team to discuss your vision,
              <br className="hidden sm:block" />
              explore possibilities, and start creating something.
            </p>
            <div className={compact ? "flex flex-col sm:flex-row gap-3 sm:gap-4" : "flex flex-col sm:flex-row gap-4"}>
              <Link href="/#contact-section">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold w-full sm:w-auto flex items-center gap-2 justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Book a meeting
                </Button>
              </Link>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold bg-black/30 w-full sm:w-auto flex items-center gap-2 justify-center border inline-flex"
              >
                Contact via WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
