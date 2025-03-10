"use client"

import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bell, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"

const Header = () => {
  // Mock session for demo purposes
  const session = { user: null }
  const { cartItems } = useCart()
  const cartItemCount = cartItems?.length || 0

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="items-center flex w-full justify-between px-3 py-4">
      <Link href={"/"} className="font-antonsc text-3xl flex items-center">
        <span className="text-5xl" aria-label="Duchess Pastries">
          🧁
        </span>
      </Link>

      <nav className="flex space-x-3 justify-center align-middle items-center">
        {/* Search Bar - Only visible on larger screens */}
        <div className="hidden lg:flex relative w-64 xl:w-96 mr-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#361C1C] focus:border-[#361C1C]"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* Notification Icon - Only visible on larger screens */}
        <Button variant="ghost" size="icon" className="hidden lg:flex relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Cart Icon - Only visible on larger screens */}
        <Button variant="ghost" size="icon" className="hidden lg:flex relative" asChild>
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </Button>

        {/* Heart/Favorites Icon - Only visible on larger screens */}
        <Button variant="ghost" size="icon" className="hidden lg:flex relative" asChild>
          <Link href="/favorites">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
          </Link>
        </Button>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-500"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        )}

        {session?.user?.image ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src={session?.user?.image || "/placeholder.svg"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2 justify-center flex items-stretch flex-col gap-2">
              <Button asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href={"/signout"}>signout</Link>
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button asChild className="rounded-full">
            <Link href={"/login"}>Signin</Link>
          </Button>
        )}
      </nav>
    </div>
  )
}

export default Header
