'use client';

export default function CardProfile({
  imageSrc,
  imageAlt = 'Profile Image',
  name = '',
  bidang = '',
  description = '',
  className = '',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex w-full max-w-[360px] flex-col items-center sm:max-w-[320px] md:max-w-[300px] ${className}`}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-64 w-full rounded-2xl object-cover shadow-md sm:h-72"
        />
      )}

      <div className="mt-4 flex w-full flex-col gap-3 px-2 text-left sm:px-0">
        {bidang && (
          <span className="inline-block w-fit rounded-full border border-blue-800 bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
            {bidang}
          </span>
        )}

        <p className="text-grayDark text-lg font-bold sm:text-xl">{name}</p>

        {description && (
          <p className="text-sm text-gray-600 sm:text-base">{description}</p>
        )}
      </div>
    </div>
  );
}
