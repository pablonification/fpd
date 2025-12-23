import Image from 'next/image';

export default function Card({
  imageSrc,
  imageAlt = 'Card Image',
  texts = [],
  className = '',
}) {
  return (
    <div className={`flex w-full flex-col items-start ${className}`}>
      {/* Gambar */}
      {imageSrc && (
        <div className="relative h-48 w-full overflow-hidden rounded-xl sm:h-60">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
            unoptimized={
              imageSrc.includes('youtube.com') ||
              imageSrc.includes('gstatic.com') ||
              imageSrc.includes('picsum.photos')
            }
          />
        </div>
      )}

      {/* Konten teks */}
      <div className="mt-4 flex w-full flex-col gap-2 px-0 text-left">
        {texts.map((t, index) => (
          <p
            key={index}
            className={`break-words ${
              t.bold
                ? 'text-grayDark leading-tight font-bold'
                : 'leading-normal text-gray-600'
            } ${t.size === 'large' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}
          >
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}
