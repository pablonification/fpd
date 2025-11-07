'use client';

import Link from 'next/link';

export default function ErrorPage({
  code = '400',
  message = 'Terjadi Kesalahan Pada Page',
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-black">
      {/* Kode Error */}
      <h1 className="text-[8rem] font-extrabold">{code}</h1>

      {/* Pesan */}
      <p className="mt-4 max-w-lg text-center text-2xl">{message}</p>

      {/* Tombol Kembali */}
      <Link href="/">
        <button className="text-primaryGradientStart mt-8 rounded-full bg-white px-6 py-3 font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl">
          Kembali ke Home
        </button>
      </Link>
    </div>
  );
}
