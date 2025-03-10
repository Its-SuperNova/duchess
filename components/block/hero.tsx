"use client";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const categories = [
  { name: "Cup Cake", image: "/images/categories/cupcake.png" },
  { name: "Cookies", image: "/images/categories/cookies.png" },
  { name: "Cake", image: "/images/categories/cake.png" },
  { name: "Breads", image: "/images/categories/bread.png" },
  { name: "Pastry", image: "/images/categories/croissant.png" },
  { name: "Donuts", image: "/images/categories/pink-donut.png" },
  { name: "Chocolate", image: "/images/categories/chocolate-bar.png" },
];

// New arrays for hero images
const heroMobileImages = [
  "/images/banner/hero/cake-mobile.png",
  "/images/banner/hero/cookies-mobile.png",
  "/images/banner/hero/cupcake-mobile.png",
  "/images/banner/hero/sweets-mobile.png",
];
const heroDesktopImages = [
  "/images/banner/hero/cake.png",
  "/images/banner/hero/cookies.png",
  "/images/banner/hero/cupcake.png",
  "/images/banner/hero/sweets.png",
];

const Hero = () => {
  return (
    <div className="px-3 flex flex-col gap-4 pb-[50px]">
      {/* Search Bar & Filter */}
      <div className="flex justify-between items-center gap-2 lg:hidden">
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#523435] text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded-[20px] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="bg-white dark:bg-black h-[41px] w-[48px] rounded-lg flex justify-center items-center border border-gray-200">
          <IoFilter className="text-[#523435]" />
        </div>
      </div>
      <div className="flex w-full justify-between items-center px-1 lg:hidden">
        <h2 className="text-lg font-bold">Special Offer</h2>
        <div>
          <Link href="/offers" className="font-medium text-[#361C1C]">
            See All
          </Link>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet white-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active white-bullet-active",
          }}
          speed={800}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={false}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="rounded-[20px] overflow-hidden"
        >
          {/* Mobile and Tablet Banners */}
          {heroMobileImages.map((img, idx) => (
            <SwiperSlide key={`mobile-${idx}`}>
              <div className="relative w-full block lg:hidden">
                <Image
                  src={img}
                  alt="Hero banner"
                  width={1080}
                  height={400}
                  className="w-full h-auto rounded-[20px]"
                  quality={100}
                  priority={idx === 0}
                />
              </div>
              {/* Desktop Banner */}
              <div
                className="relative w-full hidden lg:block"
                style={{ aspectRatio: "1200 / 400" }}
              >
                <Image
                  src={heroDesktopImages[idx]}
                  alt="Hero banner"
                  width={1200}
                  height={400}
                  className="w-full h-auto rounded-[20px]"
                  quality={100}
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Categories */}
      <div className="flex w-full justify-between items-center px-1">
        <h2 className="text-lg font-bold">Categories</h2>
        <div>
          <Link href="/categories" className="font-medium text-[#361C1C]">
            See All
          </Link>
        </div>
      </div>

      {/* Categories Grid - Small screens (4 columns, 4 categories) */}
      <div className="grid grid-cols-4 gap-4 mt-2 md:hidden">
        {categories.slice(0, 4).map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 relative bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={
                    category.image ||
                    `/placeholder.svg?height=96&width=96&text=${category.name}`
                  }
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-sm mt-2 text-center">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Categories Grid - Medium and large screens (7 columns, 7 categories) */}
      <div className="hidden md:grid md:grid-cols-7 gap-4 mt-2">
        {categories.map((category, index) => (
          <div key={`md-${index}`} className="flex flex-col items-center">
            <div className="w-20 lg:w-24 h-20 lg:h-24 relative bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={
                    category.image ||
                    `/placeholder.svg?height=96&width=96&text=${category.name}`
                  }
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <p className="text-base mt-2 text-center">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
