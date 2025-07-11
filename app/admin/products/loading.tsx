import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[180px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full rounded-md" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[300px]" />
        </div>
      </div>
    </div>
  )
}
