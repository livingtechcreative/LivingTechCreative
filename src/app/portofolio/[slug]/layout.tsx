import React, { ReactNode } from "react"
import portfolioSlugs from "@/data/portfolio-slugs.json"

export function generateStaticParams(): { slug: string }[] {
  console.log('[build] generateStaticParams(portofolio/layout) called')
  return (portfolioSlugs as string[]).map((slug) => ({ slug }))
}

// Mengubah ke SSR mode
export const dynamicParams = true
export const dynamic = 'force-dynamic'

export default function PortfolioSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
