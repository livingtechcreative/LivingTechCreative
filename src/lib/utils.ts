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
  
  // Configurable asset base URL (fallback to dashboard domain)
  const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL || 'https://dashboard.livingtechcreative.com'
  
  // Handle storage paths from backend
  if (imagePath.startsWith('/storage/')) {
    return `${assetBase}${imagePath}`
  }
  if (imagePath.startsWith('storage/')) {
    return `${assetBase}/${imagePath}`
  }
  
  // If it's already a relative path starting with "/", check if it's a portfolio/portofolio image
  if (imagePath.startsWith('/')) {
    const lower = imagePath.toLowerCase()
    const isPortfolioLike = lower.startsWith('/portfolio/')
      || lower.startsWith('/portfolio-cover-image/')
      || lower.startsWith('/portofolio/')
      || lower.startsWith('/portofolio-cover-image/')
      || lower.startsWith('/portofolio-cover/')

    if (isPortfolioLike) {
      // Map to external storage URL
      return `${assetBase}/storage${imagePath}`
    }
    // Otherwise assume it's a valid public asset path
    return imagePath
  }
  
  // For relative paths without leading slash
  {
    const lower = imagePath.toLowerCase()
    const isPortfolioLike = lower.startsWith('portfolio/')
      || lower.startsWith('portfolio-cover-image/')
      || lower.startsWith('portofolio/')
      || lower.startsWith('portofolio-cover-image/')
      || lower.startsWith('portofolio-cover/')

    if (isPortfolioLike) {
      return `${assetBase}/storage/${imagePath}`
    }
  }
  
  // Default: treat as backend storage key when not an absolute URL
  return `${assetBase}/storage/${imagePath}`
}