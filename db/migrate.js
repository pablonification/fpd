// Contoh sederhana migrate.ts (membutuhkan konfigurasi koneksi DB)
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from './db.js'; // Mengimpor 'client' (koneksi mentah) dari db.js

async function runMigrations() {
  console.log('Starting migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations finished!');
}

runMigrations().catch(console.error);
