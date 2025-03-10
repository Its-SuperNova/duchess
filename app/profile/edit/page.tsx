"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Camera } from "lucide-react"

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-01-01",
    gender: "male",
  })

  const [profileImage, setProfileImage] = useState("/profile-placeholder.png")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert("Profile updated successfully!")
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header - Fixed on mobile, static on large screens */}
      <div className="md:static fixed top-0 left-0 right-0 bg-white p-4 flex items-center z-50 border-b">
        <Link href="/profile" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-semibold">Personal Information</h1>
      </div>

      {/* Content - with padding to account for the fixed header on mobile only */}
      <div className="md:pt-4 pt-16 p-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-300">
              <Image
                src={profileImage || "/profile-placeholder.png"}
                alt="Profile"
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <button
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-[#8B4513] text-white p-2 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          </div>
          <p className="text-sm text-gray-500">Tap to change profile picture</p>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#F0F4F8] rounded-full border-none py-3 px-4 pl-5 placeholder:text-sm focus:ring-1 focus:ring-[#361C1C]"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#F0F4F8] rounded-full border-none py-3 px-4 pl-5 placeholder:text-sm focus:ring-1 focus:ring-[#361C1C]"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#F0F4F8] rounded-full border-none py-3 px-4 pl-5 placeholder:text-sm focus:ring-1 focus:ring-[#361C1C]"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-[#F0F4F8] rounded-full border-none py-3 px-4 pl-5 placeholder:text-sm focus:ring-1 focus:ring-[#361C1C]"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-[#F0F4F8] rounded-full border-none py-3 px-4 pl-5 appearance-none focus:ring-1 focus:ring-[#361C1C]"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="fixed bottom-[60px] left-0 right-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
        <button onClick={handleSubmit} className="w-full py-3 bg-[#8B4513] text-white rounded-full font-medium">
          Save Changes
        </button>
      </div>
    </div>
  )
}
