import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

// Pastikan DATABASE_URL sudah diatur di file .env Anda
const connectionString = process.env.DATABASE_URL;

// --- MODIFIKASI DIMULAI DI SINI ---

// 1. Ekspor client agar bisa diakhiri di migrate.js
export const client = postgres(connectionString, {
  prepare: false,
});

// 2. Buat instance db
export const db = drizzle(client, { schema });

// 3. (Opsional, tapi disarankan) Hapus default export
// Jika Anda masih ingin default export, biarkan baris di bawah:
// export default db;
