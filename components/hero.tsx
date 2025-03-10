"use client"
import { FiSearch } from "react-icons/fi"
import { IoFilter } from "react-icons/io5"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "./productcard"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

const categories = [
  { name: "Cup Cake", image: "/images/categories/cupcake.png" },
  { name: "Cookies", image: "/images/categories/cookies.png" },
  { name: "cake", image: "/images/categories/cake.png" },
  { name: "Breads", image: "/images/categories/bread.png" },
]

const Hero = () => {
  return (
    <div className="px-3 flex flex-col gap-4 pb-[50px]">
      {/* Search Bar & Filter */}
      <div className="flex justify-between items-center gap-2">
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#523435] text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded-[20px] focus:outline-none focus:ring-1 focus:ring-black border border-gray-200"
          />
        </div>
        <div className="bg-white dark:bg-black h-[41px] w-[48px] rounded-lg flex justify-center items-center border border-gray-200">
          <IoFilter className="text-[#523435]" />
        </div>
      </div>
      <div className="w-full max-w-[736px] mx-auto">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={20}
          className="rounded-[20px] swiper-custom"
        >
          {["image1.png", "image2.png", "image3.png"].map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full" style={{ aspectRatio: "736 / 414" }}>
                <Image
                  src={`/images/${img}`}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="rounded-[20px] object-cover"
                  quality={100}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Categories */}
      <div className="flex w-full justify-between items-center px-1">
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Categories</h2>
        <div>
          <Link href="/categories" className="font-medium text-[#d48926de]">
            See All
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-4 mt-2">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 relative">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-sm mt-2">{category.name}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between items-center px-1">
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Featured Product</h2>
        <div>
          <Link href="/categories" className="font-medium text-[#d48926de]">
            See All
          </Link>
        </div>
      </div>
      <ProductCard name="Red Velvet CheeseCake" rating={4.0} imageUrl="/images/red-velvet.png" />
    </div>
  )
}

export default Hero
