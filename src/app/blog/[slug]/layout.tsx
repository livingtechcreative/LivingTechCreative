import React, { ReactNode } from "react"

export const dynamicParams = false
export const dynamic = 'force-static'

export default function BlogSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
