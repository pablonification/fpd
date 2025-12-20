export default function SkeletonProjectCard() {
    return (
        <div className="flex h-[320px] w-full flex-col justify-between gap-4 rounded-3xl bg-white p-4 outline outline-1 outline-gray-200 animate-pulse sm:p-6">
            <div className="flex flex-col gap-2">
                {/* Category */}
                <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                {/* Title */}
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
                {/* Date */}
                <div className="h-3 w-1/4 rounded bg-gray-200"></div>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
        </div>
    );
}
