import React, { ReactNode } from "react";

// Mengubah ke SSR mode - tidak perlu generateStaticParams lagi
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export default function PortfolioSlugLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
