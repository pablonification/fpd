'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Card({
  imageSrc,
  imageAlt = 'Card Image',
  texts = [],
  className = '',
  priority = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const isExternal =
    imageSrc?.includes('youtube.com') ||
    imageSrc?.includes('gstatic.com') ||
    imageSrc?.includes('picsum.photos');

  return (
    <div className={`flex w-full flex-col items-start ${className}`}>
      {/* Gambar */}
      {imageSrc && (
        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-60">
          {/* Skeleton placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]" />
          )}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            placeholder={!isExternal ? 'blur' : 'empty'}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AqXW5r+31C7t4bmWOKOZkRFbgAoJAHXwcVH/dV7/Vx/KKKoP/2Q=="
            unoptimized={isExternal}
            onLoad={() => setIsLoaded(true)}
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
