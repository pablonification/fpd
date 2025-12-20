export default function SkeletonCard() {
    return (
        <div className="flex w-full flex-col items-start gap-4 animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 w-full rounded-xl bg-gray-200 sm:h-60"></div>

            {/* Text Content Skeleton */}
            <div className="flex w-full flex-col gap-2">
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
        </div>
    );
}
