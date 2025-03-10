"use client"
import Link from "next/link"
import { ArrowLeft, ChevronRight, ChevronRightIcon } from "lucide-react"

// Import icons individually to reduce bundle size
import { User, MapPin, ShoppingBag, Heart } from "lucide-react"
import { Bell, CreditCard, LogOut, HelpCircle, MessageSquare } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F6FB" }}>
      {/* White Header - Replacing the brown banner */}
      <div className="sticky top-0 z-10 bg-white p-4 flex items-center border-b shadow-sm">
        <Link href="/" className="mr-4">
          <div className="bg-gray-100 p-2 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </div>
        </Link>
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* User Card - New Design */}
      <div className="px-4 pt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-blue-500 text-2xl font-semibold">A</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Ashwin</h2>
              <p className="text-gray-500 text-sm">its.ashwin.23@gmail.com</p>
              <Link href="/profile/activity" className="text-red-400 text-sm flex items-center mt-1">
                View activity <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content in White Boxes */}
      <div className="px-4 pb-20">
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase px-4 pt-4 pb-2">Account Settings</h3>

          <Link href="/profile/edit" className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 mr-3" />
              <span>Personal Information</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/profile/addresses" className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
              <span>Delivery Addresses</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/profile/orders" className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-gray-500 mr-3" />
              <span>Order</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/profile/favorites" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-gray-500 mr-3" />
              <span>Favorite Pastries</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase px-4 pt-4 pb-2">Preferences</h3>

          <Link
            href="/profile/notifications"
            className="flex items-center justify-between p-4 border-b border-gray-100"
          >
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-500 mr-3" />
              <span>Notifications</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/profile/payment" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
              <span>Payment Methods</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* Support */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase px-4 pt-4 pb-2">Support</h3>

          <Link href="/help" className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
              <span>Help Center</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/feedback" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-gray-500 mr-3" />
              <span>Give us Feedback</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* Logout Button */}
        <button className="bg-white rounded-xl shadow-sm w-full p-4 flex items-center text-red-500 mb-4">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>

        {/* App Version */}
        <div className="text-center text-gray-400 text-xs">
          <p>Duchess Pastries v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
