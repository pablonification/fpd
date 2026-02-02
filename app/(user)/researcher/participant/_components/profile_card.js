'use client';

import { ArrowUpRight } from 'lucide-react';

export default function CardProfile({
  imageSrc,
  imageAlt = 'Profile Image',
  name = '',
  bidang = '',
  className = '',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-[#1a1a1a] ${className}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-[0.7]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-white" />
        </div>

        <div className="absolute right-0 bottom-0 left-0 p-5">
          <h3 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
            {name}
          </h3>

          {bidang && (
            <p className="mt-2 text-sm font-medium text-white/70 sm:text-base">
              {bidang}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
