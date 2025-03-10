"use client"

import { useState } from "react"
import Image from "next/image"
import { FaStar, FaHeart, FaRegHeart, FaShare } from "react-icons/fa"
import { BsArrowLeft } from "react-icons/bs"
import { useParams, useRouter } from "next/navigation"
import { useFavorites, type Product } from "@/context/favorites-context"
import { useCart } from "@/context/cart-context"
import { useEffect } from "react"

// Mock product data (in a real app, this would come from an API or database)
const productData = [
  {
    id: 1,
    name: "Red Velvet Cake",
    rating: 4.8,
    imageUrl: "/red-velvet-cheesecake.png",
    price: 499,
    category: "Cake",
    isVeg: true,
    description:
      "Layered with creamy cheesecake, made with cocoa, cream cheese, and vanilla. The perfect balance of sweetness with a hint of cocoa flavor. A classic dessert perfect for any occasion.",
    seller: {
      name: "Jenny Wilson",
      role: "Baker",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/red-velvet-cheesecake.png",
      "/images/red-velvet.png",
      "/colorful-fruit-tart.png",
      "/vibrant-macarons.png",
      "/classic-glazed.png",
    ],
  },
  {
    id: 2,
    name: "Chocolate Eclair",
    rating: 4.7,
    imageUrl: "/classic-chocolate-eclair.png",
    price: 299,
    category: "Pastry",
    isVeg: true,
    description:
      "Crisp choux pastry filled with rich chocolate cream and topped with chocolate glaze. Hand-crafted with premium ingredients for an authentic French pastry experience.",
    seller: {
      name: "Jenny Wilson",
      role: "Chef",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/classic-chocolate-eclair.png",
      "/classic-glazed.png",
      "/decadent-chocolate-brownie.png",
      "/vibrant-macarons.png",
      "/colorful-fruit-tart.png",
    ],
  },
  {
    id: 3,
    name: "Strawberry Cheesecake",
    rating: 4.9,
    imageUrl: "/classic-strawberry-cheesecake.png",
    price: 549,
    category: "Cake",
    isVeg: true,
    description:
      "Creamy cheesecake with a graham cracker crust topped with fresh strawberry compote. Made with premium cream cheese and fresh seasonal strawberries.",
    seller: {
      name: "Jenny Wilson",
      role: "Pastry Chef",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/classic-strawberry-cheesecake.png",
      "/classic-strawberry-cake.png",
      "/colorful-fruit-tart.png",
      "/layered-strawberry-cream.png",
      "/vibrant-macarons.png",
    ],
  },
  {
    id: 4,
    name: "Lemon Tart",
    rating: 4.6,
    imageUrl: "/bright-lemon-tart.png",
    price: 349,
    category: "Tart",
    isVeg: true,
    description:
      "Buttery pastry shell filled with tangy lemon curd and dusted with powdered sugar. The perfect balance of sweet and tart flavors in every bite.",
    seller: {
      name: "Jenny Wilson",
      role: "Baker",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/bright-lemon-tart.png",
      "/colorful-fruit-tart.png",
      "/classic-apple-pie.png",
      "/vibrant-macarons.png",
      "/golden-butter-croissant.png",
    ],
  },
  {
    id: 5,
    name: "Raspberry Macarons",
    rating: 4.8,
    imageUrl: "/vibrant-raspberry-macarons.png",
    price: 399,
    category: "Macaron",
    isVeg: true,
    description:
      "Delicate almond meringue cookies filled with raspberry buttercream. Light, airy cookies with a chewy center and crisp exterior. Made with almond flour and natural raspberry flavor.",
    seller: {
      name: "Jenny Wilson",
      role: "Patissier",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/vibrant-raspberry-macarons.png",
      "/vibrant-macarons.png",
      "/colorful-candy-mix.png",
      "/colorful-fruit-tart.png",
      "/classic-glazed.png",
    ],
  },
  {
    id: 6,
    name: "Chocolate Chip Cookies",
    rating: 4.7,
    imageUrl: "/classic-chocolate-chip-cookies.png",
    price: 249,
    category: "Cookie",
    isVeg: true,
    description:
      "Classic cookies loaded with premium chocolate chips and baked to golden perfection. Crisp edges with a soft, chewy center. Made with real butter and premium chocolate.",
    seller: {
      name: "Jenny Wilson",
      role: "Baker",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/classic-chocolate-chip-cookies.png",
      "/festive-cookie-display.png",
      "/colorful-candy-mix.png",
      "/colorful-fruit-tart.png",
      "/decadent-chocolate-brownie.png",
    ],
  },
  {
    id: 7,
    name: "Vanilla Cake",
    rating: 4.5,
    imageUrl: "/classic-vanilla-cake.png",
    price: 449,
    category: "Cake",
    isVeg: true,
    description:
      "Light and fluffy vanilla sponge cake with smooth buttercream frosting. Made with Madagascar vanilla beans for exceptional flavor. Perfect for birthdays and celebrations.",
    seller: {
      name: "Jenny Wilson",
      role: "Cake Artist",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/classic-vanilla-cake.png",
      "/celebration-cake.png",
      "/classic-strawberry-cake.png",
      "/decadent-chocolate-cake.png",
      "/layered-strawberry-cream.png",
    ],
  },
  {
    id: 8,
    name: "Chocolate Brownie",
    rating: 4.9,
    imageUrl: "/decadent-chocolate-brownie.png",
    price: 299,
    category: "Brownie",
    isVeg: true,
    description:
      "Rich, fudgy chocolate brownie with a crackly top and gooey center. Made with premium Belgian chocolate for an intense chocolate experience. Perfect indulgence for chocolate lovers.",
    seller: {
      name: "Jenny Wilson",
      role: "Pastry Chef",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/decadent-chocolate-brownie.png",
      "/decadent-chocolate-cake.png",
      "/decadent-chocolate-almond-cake.png",
      "/decadent-berry-chocolate.png",
      "/mocha-delight.png",
    ],
  },
  {
    id: 9,
    name: "Strawberry Cupcake",
    rating: 4.6,
    imageUrl: "/frosted-strawberry-cupcake.png",
    price: 279,
    category: "Cupcake",
    isVeg: true,
    description:
      "Moist vanilla cupcake topped with strawberry buttercream and fresh strawberry. Made with real strawberries for natural flavor and color. A delightful individual treat.",
    seller: {
      name: "Jenny Wilson",
      role: "Baker",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/frosted-strawberry-cupcake.png",
      "/swirled-delight.png",
      "/layered-strawberry-cream.png",
      "/classic-strawberry-cake.png",
      "/celebration-cake.png",
    ],
  },
  {
    id: 10,
    name: "Rustic Sourdough",
    rating: 4.7,
    imageUrl: "/rustic-loaf.png",
    price: 349,
    category: "Bread",
    isVeg: true,
    description:
      "Artisanal sourdough bread with a crispy crust and chewy interior. Made with a 100-year-old starter for complex flavor. Fermented for 24 hours for improved digestibility.",
    seller: {
      name: "Jenny Wilson",
      role: "Baker",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/rustic-loaf.png",
      "/delightful-pastries.png",
      "/golden-butter-croissant.png",
      "/celebration-cake.png",
      "/autumn-treats.png",
    ],
  },
  {
    id: 11,
    name: "Chocolate Almond Cake",
    rating: 4.8,
    imageUrl: "/decadent-chocolate-almond-cake.png",
    price: 599,
    category: "Cake",
    isVeg: true,
    description:
      "Rich chocolate cake with almond flour, topped with ganache and toasted almonds. Gluten-friendly and incredibly moist. The perfect combination of chocolate and nuts.",
    seller: {
      name: "Jenny Wilson",
      role: "Chef",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/decadent-chocolate-almond-cake.png",
      "/decadent-chocolate-cake.png",
      "/decadent-berry-chocolate.png",
      "/decadent-chocolate-slice.png",
      "/mocha-delight.png",
    ],
  },
  {
    id: 12,
    name: "Celebration Cake",
    rating: 5.0,
    imageUrl: "/celebration-cake.png",
    price: 799,
    category: "Cake",
    isVeg: true,
    description:
      "Festive layered cake with colorful sprinkles, perfect for special occasions. Three layers of vanilla sponge with buttercream frosting. Decorated with rainbow sprinkles for a festive look.",
    seller: {
      name: "Jenny Wilson",
      role: "Cake Designer",
      avatar: "/jenny-wilson.jpg",
    },
    images: [
      "/celebration-cake.png",
      "/classic-vanilla-cake.png",
      "/classic-strawberry-cake.png",
      "/decadent-chocolate-cake.png",
      "/layered-strawberry-cream.png",
    ],
  },
]

// Weight options
const weightOptions = [
  { value: 0.5, label: "0.5 Kg" },
  { value: 1, label: "1 Kg" },
  { value: 1.5, label: "1.5 Kg" },
  { value: 2, label: "2 Kg" },
  { value: 4, label: "4 Kg" },
]

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = Number(params?.id)

  // Find the product
  const product = productData.find((p) => p.id === productId)

  // If product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button onClick={() => router.push("/")} className="bg-primary text-white px-4 py-2 rounded-lg">
          Go Back Home
        </button>
      </div>
    )
  }

  const { addToCart } = useCart()

  // State for selected weight and main image
  const [selectedWeight, setSelectedWeight] = useState<number>(1)
  const [mainImage, setMainImage] = useState(product.imageUrl)
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const [isLiked, setIsLiked] = useState(isFavorite(product.id))

  useEffect(() => {
    setIsLiked(isFavorite(product.id))
  }, [isFavorite, product.id])

  // Calculate price based on weight
  const totalPrice = product.price * selectedWeight

  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    const productData: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      isVeg: product.isVeg,
      description: product.description,
      rating: product.rating,
    }

    if (isLiked) {
      removeFromFavorites(product.id)
      setIsLiked(false)
    } else {
      addToFavorites(productData)
      setIsLiked(true)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1,
      weight: selectedWeight,
    })

    // Show a toast or notification here
    alert(`Added ${product.name} to cart!`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top navigation */}
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-[350px] w-full bg-gray-200">
          <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill priority className="object-cover" />

          {/* Nav buttons */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md"
            >
              <BsArrowLeft className="text-gray-800" size={20} />
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleFavoriteToggle}
                className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" size={20} />
                ) : (
                  <FaRegHeart className="text-gray-800" size={20} />
                )}
              </button>

              <button className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md">
                <FaShare className="text-gray-800" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Image thumbnails */}
        <div className="absolute bottom-3 left-0 right-0 px-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 px-1">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 ${
                  mainImage === image ? "border-primary" : "border-white"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-4 flex-1">
        {/* Category and Rating */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">{product.category}</span>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Name and Veg Indicator */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.isVeg && (
            <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center rounded-sm">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">{product.description}</p>
          <button className="text-amber-700 dark:text-amber-500 font-medium">Read more</button>
        </div>

        {/* Weight Selection */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Select Weight</h2>
          <div className="flex gap-3 flex-wrap">
            {weightOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedWeight(option.value)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedWeight === option.value
                    ? "bg-amber-800 text-white border-amber-800"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart - Sticky at bottom */}
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between z-40">
          <div>
            <p className="text-gray-500 text-sm">Total Price</p>
            <p className="text-xl font-bold">₹{Math.round(totalPrice)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-amber-800 text-white rounded-full px-6 py-3 flex items-center gap-2"
          >
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
              className="mr-1"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="font-medium">Add to Cart</span>
          </button>
        </div>

        {/* Add padding at the bottom to account for the sticky button */}
        <div className="h-24"></div>
      </div>
    </div>
  )
}
