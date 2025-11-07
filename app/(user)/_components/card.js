'use client';

export default function Card({
  imageSrc,
  imageAlt = 'Card Image',
  texts = [],
  className = '',
}) {
  return (
    <div className={`flex w-[300px] flex-col items-center ${className}`}>
      {/* Gambar */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-60 w-[338px] rounded-xl object-cover"
        />
      )}

      {/* Konten teks */}
      <div className="mt-4 flex flex-col gap-2 text-left">
        {texts.map((t, index) => (
          <p
            key={index}
            className={`${
              t.bold ? 'text-grayDark font-bold' : 'text-gray-600'
            } ${t.size === 'large' ? 'text-lg' : 'text-sm'}`}
          >
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}
