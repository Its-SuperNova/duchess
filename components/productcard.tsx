"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa"
import { BiSolidOffer } from "react-icons/bi"
import { useFavorites, type Product } from "@/context/favorites-context"

interface ProductCardProps {
  id?: number
  name: string
  rating: number
  imageUrl: string
  price?: number
  isVeg?: boolean
  description?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  id = 1,
  name,
  rating,
  imageUrl,
  price = 499,
  isVeg = true,
  description = "layered with creamy cheesecake, made with cocoa, cream cheese, and vanilla.",
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const isLiked = isFavorite(id)

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const product: Product = {
      id,
      name,
      price,
      // Ensure the image path is consistent
      image: imageUrl.startsWith("/") ? imageUrl : `/images/${imageUrl}`,
      isVeg,
      description,
      rating,
    }

    if (isLiked) {
      removeFromFavorites(id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <Link href={`/products/${id}`} className="block h-full">
      <div className="bg-white dark:bg-[#17181C] rounded-[20px] shadow-md overflow-hidden h-full flex flex-col">
        {/* Product Image Section - Fixed height */}
        <div className="relative h-[200px] w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-white dark:bg-[#17181C] font-semibold text-black dark:text-white px-3 py-1 rounded-full flex justify-center items-center space-x-2 text-[16px]">
            <FaStar className="text-yellow-400" />
            <p>{rating}</p>
          </div>
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 bg-white dark:bg-[#17181C] p-2 rounded-full shadow-md transition-transform duration-200 ease-in-out"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? (
              <FaHeart className="w-4 h-4 text-red-500" />
            ) : (
              <FaRegHeart className="w-4 h-4 text-gray-400 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Restaurant Info Section - Flexible height with flex-grow */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-2 item-center">
            <h2 className="text-[18px] font-semibold text-gray-800 dark:text-white line-clamp-1">{name}</h2>
            <div className="mb-1">
              <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center rounded-sm">
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <p className="text-[14px] leading-[16px] text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
            {description}
          </p>
        </div>

        {/* Offer Section - Fixed height */}
        <div className="p-4 pt-3 border-t border-gray-400 dark:border-gray-600 border-dashed flex items-center gap-2">
          <BiSolidOffer size={20} color="blue" />
          <p className="text-[16px] font-semibold text-gray-700 dark:text-gray-200">10% OFF up to ₹60 </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
