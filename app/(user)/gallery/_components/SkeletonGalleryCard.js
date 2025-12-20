export default function SkeletonGalleryCard() {
    return (
        <div className="flex w-full max-w-[360px] flex-col items-center animate-pulse">
            {/* Thumbnail */}
            <div className="h-48 w-full rounded-xl bg-gray-200 sm:h-60"></div>

            {/* Text Lines */}
            <div className="mt-4 flex w-full flex-col gap-2 px-2 sm:px-0">
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
            </div>
        </div>
    );
}
