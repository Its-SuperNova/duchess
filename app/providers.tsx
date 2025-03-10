"use client"

import type React from "react"

import { useRegisterServiceWorker } from "./register-sw"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { FavoritesProvider } from "@/context/favorites-context"

export function Providers({ children }: { children: React.ReactNode }) {
  // Register service worker
  useRegisterServiceWorker()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
