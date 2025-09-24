import React, { ReactNode } from "react"
import portfolioSlugs from "@/data/portfolio-slugs.json"

export function generateStaticParams(): { slug: string }[] {
  console.log('[build] generateStaticParams(portofolio/layout) called')
  return (portfolioSlugs as string[]).map((slug) => ({ slug }))
}

export const dynamicParams = false
export const dynamic = 'force-static'

export default function PortfolioSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
