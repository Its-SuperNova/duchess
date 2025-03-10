"use client"

export const NewsletterSubscription = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-2">Never Miss a Deal!</h2>
        <p className="text-gray-600 mb-6">Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
        <div className="flex justify-center">
          <div className="flex w-full max-w-md border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email id"
              className="flex-grow py-3 px-4 focus:outline-none text-gray-900"
            />
            <button className="bg-[#361C1C] hover:bg-[#4A2C2C] text-white py-3 px-6 font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  )
}
