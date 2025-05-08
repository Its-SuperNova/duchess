"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar, FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { useFavorites, type Product } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";
import { useEffect } from "react";
import {
  Shell,
  Candy,
  Dumbbell,
  Droplet,
  Wheat,
  CircleDot,
} from "lucide-react";
import {
  Calendar,
  Check,
  Flame,
  Gift,
  MessageSquare,
  Pencil,
  Utensils,
  Truck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
];

// Weight options
const weightOptions = [
  { value: 0.5, label: "0.5 Kg" },
  { value: 1, label: "1 Kg" },
  { value: 1.5, label: "1.5 Kg" },
  { value: 2, label: "2 Kg" },
  { value: 4, label: "4 Kg" },
];

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params?.id);

  // Find the product
  const product = productData.find((p) => p.id === productId);

  // If product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const { addToCart } = useCart();

  // State for selected weight and main image
  const [selectedWeight, setSelectedWeight] = useState<number>(1);
  const [mainImage, setMainImage] = useState(product.imageUrl);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isLiked, setIsLiked] = useState(isFavorite(product.id));

  // Add state for order type and piece quantity
  const [orderType, setOrderType] = useState<"kg" | "piece">("kg");
  const [pieceQuantity, setPieceQuantity] = useState(1);

  // Add state for cake text and checkbox
  const [addCakeText, setAddCakeText] = useState(false);
  const [cakeText, setCakeText] = useState("");
  const maxCakeTextLength = 10;

  useEffect(() => {
    setIsLiked(isFavorite(product.id));
  }, [isFavorite, product.id]);

  // Calculate price based on weight
  const totalPrice =
    orderType === "kg"
      ? product.price * selectedWeight
      : product.price * pieceQuantity;

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
    };

    if (isLiked) {
      removeFromFavorites(product.id);
      setIsLiked(false);
    } else {
      addToFavorites(productData);
      setIsLiked(true);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: orderType === "kg" ? 1 : pieceQuantity,
      weight: orderType === "kg" ? selectedWeight : 1,
      category: product.category,
      variant: orderType === "kg" ? "Regular" : "Piece",
      ...(addCakeText && cakeText ? { cakeText } : {}),
    });

    // Show a toast or notification here
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="bg-[#f5f5f5]">
      <div className="max-w-[1300px] flex flex-col min-h-screen mb-20 mx-4">
        {/* Main content: two columns on desktop, one column on mobile */}
        <div className="flex flex-col md:flex-row md:gap-8 md:p-8 flex-1">
          {/* Left column */}
          <div className="md:w-2/3 flex flex-col gap-6">
            {/* Top navigation and Hero Image */}
            <div className="relative mt-4 rounded-2xl overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-[350px] lg:h-[450px] w-full rounded-2xl overflow-hidden">
                <Image
                  src={mainImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover rounded-2xl"
                />

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
            <div className="p-6  bg-white rounded-2xl shadow-sm">
              {/* Category and Rating */}
              <div className="flex justify-between items-center">
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
              <div className="mb-6 mt-2">
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                  {product.description}
                </p>
                <button className="text-amber-700 dark:text-amber-500 font-medium">
                  Read more
                </button>
              </div>

              {/* Product Highlights / Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Bestseller",
                  "Eggless Option",
                  "100% Veg",
                  "No Preservatives",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Ingredients Preview */}
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-xs">
                  <span className="mr-1">🍫</span>Cocoa
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-xs">
                  <span className="mr-1">🧀</span>Cheese
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-xs">
                  <span className="mr-1">🍓</span>Strawberry
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center text-xs">
                  <span className="mr-1">🥚</span>Eggless
                </span>
              </div>
            </div>

            <Card className="w-full bg-white shadow-md rounded-xl">
              <div className="pt-6"></div>
              <CardContent className="grid gap-6">
                {/* Two-column layout for desktop, stack on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column - Delivery Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Delivery Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>Same-day delivery available</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                        <span>Schedule for later</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
                        <span className="font-medium">
                          Estimated delivery: Today, 5-7pm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right column - Customization */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customization</h3>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <Pencil className="h-5 w-5 text-gray-500 mt-0.5" />
                        <span>Add text on cake</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Flame className="h-5 w-5 text-gray-500 mt-0.5" />
                        <span>Add candles</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Utensils className="h-5 w-5 text-gray-500 mt-0.5" />
                        <span>Add knife</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5" />
                        <span>Add message card</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator spanning full width */}
                <Separator />

                {/* Offers section at the bottom */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Offers</h3>
                  <div className="flex items-start gap-2 bg-green-50 p-3 rounded-md">
                    <Gift className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="font-medium text-green-700">
                      10% off on orders above ₹1000
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column (Weight, Price, Add to Cart) - only on md and up */}
          <div className="hidden md:flex md:w-1/3 flex-col gap-6">
            {/* Card 1: Order Type, Select Weight/Quantity, Price, Add to Cart */}
            <div className="w-full bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col gap-6 h-fit mt-8 shadow-sm">
              {/* Order Type */}
              <div className="mb-4">
                <h2 className="font-semibold text-lg mb-2">Order Type</h2>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="orderType"
                      value="kg"
                      checked={orderType === "kg"}
                      onChange={() => setOrderType("kg")}
                      className="accent-amber-800"
                    />
                    By Kg
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="orderType"
                      value="piece"
                      checked={orderType === "piece"}
                      onChange={() => setOrderType("piece")}
                      className="accent-amber-800"
                    />
                    By Piece
                  </label>
                </div>
              </div>
              {/* Weight/Quantity Selection */}
              {orderType === "kg" ? (
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
              ) : (
                <div className="mb-6">
                  <h2 className="font-semibold text-lg mb-2">
                    Select Quantity
                  </h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setPieceQuantity(Math.max(1, pieceQuantity - 1))
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {pieceQuantity}
                    </span>
                    <button
                      onClick={() => setPieceQuantity(pieceQuantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              {/* Price and Add to Cart */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Total Price</p>
                  <p className="text-xl font-bold">₹{Math.round(totalPrice)}</p>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-amber-800 text-white rounded-full px-6 py-3 flex items-center gap-2 w-full justify-center"
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
            </div>
            {/* Card 2: Nutrition Info (move to right section on desktop) */}
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Macronutrients Breakdown
              </h2>
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="text-3xl font-bold text-gray-800">360 Cal</p>
                  </div>
                  <div className="text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-lg">
                    Net wt: 100 g
                  </div>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-5 h-5" />
                      <span>Proteins</span>
                    </div>
                    <span>3.2 g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5" />
                      <span>Fats</span>
                    </div>
                    <span>18.0 g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/svg/food/bread.svg"
                        alt="Carbs"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span>Carbs</span>
                    </div>
                    <span>46.0 g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Candy className="w-5 h-5" />
                      <span>Sugars</span>
                    </div>
                    <span>34.0 g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Wheat className="w-5 h-5" />
                      <span>Fiber</span>
                    </div>
                    <span>0.6 g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shell className="w-5 h-5" />
                      <span>Sodium</span>
                    </div>
                    <span>250 mg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Add to Cart - Sticky at bottom for screens < 767px */}
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between z-40 md:hidden">
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

        {/* Add padding at the bottom to account for the sticky button on mobile only */}
        <div className="h-24 md:h-0"></div>
      </div>
    </div>
  );
}
