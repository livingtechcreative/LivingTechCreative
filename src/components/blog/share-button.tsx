"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

type ShareButtonProps = {
  title: string
  url: string
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          url: url,
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  )
}
