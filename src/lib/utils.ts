import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes image paths for Next.js Image component
 * Ensures relative paths start with "/" and handles absolute URLs
 */
export function normalizeImagePath(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return "/placeholder.svg"
  }
  
  // If it's already an absolute URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it's already a relative path starting with "/", check if it's a portfolio image
  if (imagePath.startsWith('/')) {
    // If it's a portfolio image path that doesn't exist locally, convert to external URL
    if (imagePath.startsWith('/portfolio/')) {
      const externalUrl = `https://livingtechcreative.com/storage${imagePath}`
      console.log(`Normalizing portfolio image: ${imagePath} -> ${externalUrl}`)
      return externalUrl
    }
    return imagePath
  }
  
  // For relative paths without leading slash
  if (imagePath.startsWith('portfolio/')) {
    // Convert portfolio paths to external URL
    const externalUrl = `https://livingtechcreative.com/storage/${imagePath}`
    console.log(`Normalizing portfolio image: ${imagePath} -> ${externalUrl}`)
    return externalUrl
  }
  
  // Add leading slash for other relative paths
  return `/${imagePath}`
}