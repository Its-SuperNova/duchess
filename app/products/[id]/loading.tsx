import { Skeleton } from "@/components/ui/skeleton"
import { BsArrowLeft } from "react-icons/bs"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Skeleton for the hero image */}
      <div className="relative h-[350px] w-full">
        <Skeleton className="h-full w-full" />

        {/* Nav buttons */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md">
            <BsArrowLeft className="text-gray-800" size={20} />
          </button>

          <div className="flex gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Skeleton thumbnails */}
        <div className="absolute bottom-3 left-0 right-0 px-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 px-1">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeleton key={index} className="w-16 h-16 rounded-xl flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="w-5 h-5 rounded-sm" />
        </div>

        <Skeleton className="h-16 w-full rounded-xl mb-6" />

        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-5 w-24 mb-6" />

        <Skeleton className="h-5 w-32 mb-3" />
        <div className="flex gap-3 flex-wrap mb-6">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className="h-10 w-20 rounded-lg" />
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  )
}
