export default function SkeletonCard() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      {/* Image Skeleton dengan animasi shimmer */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-60">
        <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]" />
      </div>

      {/* Text Content Skeleton */}
      <div className="flex w-full flex-col gap-2">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
