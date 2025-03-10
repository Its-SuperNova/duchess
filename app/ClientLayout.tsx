"use client"

import type React from "react"
import BottomNav from "@/components/block/BottomNav"
import Footer from "@/components/block/Footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
      <Footer />
    </>
  )
}
