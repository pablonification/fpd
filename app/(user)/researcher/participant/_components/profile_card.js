'use client';

export default function CardProfile({
  imageSrc,
  imageAlt = 'Profile Image',
  name = '',
  bidang = '',
  description = '',
  className = '',
  expertise = '',
  affiliation = '',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex w-full max-w-[360px] cursor-pointer flex-col items-center sm:max-w-[320px] md:max-w-[300px] ${className}`}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-64 w-full rounded-2xl object-cover shadow-md transition-all duration-300 ease-out group-hover:brightness-[0.8] sm:h-72"
        />
      )}

      <div className="mt-4 flex w-full flex-col gap-3 px-2 text-left sm:px-0">
        <p className="text-grayDark group-hover:text-primaryGradientEnd text-lg font-bold transition-colors duration-300 ease-out sm:text-xl">
          {name}
        </p>

        {description && (
          <p className="line-clamp-2 text-sm text-gray-600 sm:text-base">
            {expertise}
          </p>
        )}

        {bidang && (
          <p className="text-sm text-[#2497A9] sm:text-base">{affiliation}</p>
        )}
      </div>
    </div>
  );
}
