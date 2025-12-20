export default function SkeletonProfileCard() {
    return (
        <div className="flex w-full max-w-[360px] flex-col items-center animate-pulse sm:max-w-[320px] md:max-w-[300px]">
            {/* Image */}
            <div className="h-64 w-full rounded-2xl bg-gray-200 sm:h-72 shadow-md"></div>

            {/* Info */}
            <div className="mt-4 flex w-full flex-col gap-3 px-2 sm:px-0">
                <div className="h-6 w-1/2 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
        </div>
    );
}
