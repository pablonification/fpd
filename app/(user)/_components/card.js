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
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-48 w-full rounded-xl object-cover sm:h-60"
        />
      )}

      {/* Konten teks */}
      <div className="mt-4 flex w-full flex-col gap-2 px-0 text-left">
        {texts.map((t, index) => (
          <p
            key={index}
            className={`break-words ${
              t.bold ? 'text-grayDark font-bold' : 'text-gray-600'
            } ${t.size === 'large' ? 'text-lg sm:text-lg' : 'text-sm sm:text-sm'}`}
          >
            {t.text}
          </p>
        ))}
      </div>
    </div>
  );
}
