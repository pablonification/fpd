// app/api/status/route.js

/**
 * Route Handler untuk memeriksa status API.
 * * URL yang akan diakses: /api/status
 * Metode yang ditangani: GET
 */
export async function GET() {
  // Menggunakan Response.json() untuk mengembalikan respons JSON
  // Next.js secara otomatis menangani header Content-Type: application/json
  return Response.json({
    status: 'alive!',
    timestamp: new Date().toISOString(),
  });

  // Jika Anda hanya ingin mengembalikan teks biasa (plain text), Anda bisa menggunakan:
  // return new Response("Alive!", { status: 200 });
}

// Catatan: Anda tidak perlu menambahkan 'use client' karena ini adalah kode sisi server (Server Side Code).
