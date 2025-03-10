import type React from "react"
import "../../globals.css"
import "./styles.css"
import { Providers } from "../../providers"
import BottomNav from "@/components/block/BottomNav"

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Providers>
          <main className="flex flex-col min-h-screen">
            {children}
            <BottomNav />
          </main>
        </Providers>
      </body>
    </html>
  )
}
