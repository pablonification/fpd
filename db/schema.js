// src/db/schema.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm'; // Untuk relasi antar tabel

// Enum untuk kategori researcher (D12) dan peran admin
export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'dosen_pembimbing',
  'mahasiswa_magister',
  'mahasiswa_sarjana',
  'alumni',
]);

export const users = pgTable('users', {
  // Field Umum (D11, D24)
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(), // Untuk login & kontak
  passwordHash: text('password_hash'), // Untuk Admin Login (D24)

  // Field Researcher (D11, D12)
  role: userRoleEnum('role').notNull().default('mahasiswa_sarjana'), // Dosen Pembimbing, Mahasiswa, Admin, dll.
  position: varchar('position', { length: 255 }), // Jabatan (D11)
  affiliation: varchar('affiliation', { length: 255 }), // Afiliasi (D11)
  photoUrl: text('photo_url'), // Foto (D11)
  researchField: text('research_field'), // Bidang Riset/Keahlian (D10, D11)
  contactInfo: varchar('contact_info', { length: 255 }), // Kontak/Email publik (D11)
  isPublicProfile: boolean('is_public_profile').default(true),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasi untuk memudahkan query
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

// Skema Proyek/Riset (D13, D14, D20)
export const projectStatusEnum = pgEnum('project_status', [
  'running',
  'completed',
  'upcoming',
]);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(), // Judul (D14)
  year: varchar('year', { length: 4 }), // Tahun (D14)
  status: projectStatusEnum('status').notNull().default('upcoming'), // Running, Completed, Upcoming (D13)
  description: text('description'), // Deskripsi Singkat (D14)
  results: text('results'), // Hasil (D14)

  // Penanggung Jawab / Lead Researcher (D14)
  leadResearcherId: serial('lead_researcher_id').references(() => users.id),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasi untuk Proyek
export const projectsRelations = relations(projects, ({ one, many }) => ({
  leadResearcher: one(users, {
    fields: [projects.leadResearcherId],
    references: [users.id],
  }),
  publications: many(publications),
}));

// Skema Publikasi (D4, D15)
export const publications = pgTable('publications', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  authors: text('authors').notNull(),
  journalOrConference: text('journal_or_conference'),
  year: varchar('year', { length: 4 }),
  link: text('link'),
  isHighlighted: boolean('is_highlighted').default(false), // Untuk Highlighted Publikasi (D4)

  // Relasi ke proyek (publikasi bisa terkait dengan satu proyek)
  projectId: serial('project_id').references(() => projects.id),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const publicationsRelations = relations(publications, ({ one }) => ({
  project: one(projects, {
    fields: [publications.projectId],
    references: [projects.id],
  }),
}));

export const projectCollaborators = pgTable('project_collaborators', {
  projectId: serial('project_id').references(() => projects.id),
  userId: serial('user_id').references(() => users.id),
});

export const projectCollaboratorsRelations = relations(
  projectCollaborators,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectCollaborators.projectId],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [projectCollaborators.userId],
      references: [users.id],
    }),
  })
);

// Skema Berita (D6)
export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(), // Untuk URL berita
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  isFeatured: boolean('is_featured').default(false), // Untuk visualisasi aktivitas (D3)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Skema Konten Statis (About, Contact) (D22, D23)
// Menggunakan satu tabel untuk About, Contact, dll., yang diakses berdasarkan 'key'
export const staticContent = pgTable('static_content', {
  id: serial('id').primaryKey(),
  contentKey: varchar('content_key', { length: 50 }).unique().notNull(), // Contoh: 'about_description', 'vision_mission', 'contact_email'
  title: varchar('title', { length: 255 }), // Judul konten (opsional)
  content: text('content').notNull(), // Isi konten (deskripsi, visi, email, dll.)

  // Contoh key:
  // 'about_description' (D7)
  // 'vision_mission' (D8)
  // 'group_history' (D9)
  // 'contact_email' (D25)
  // 'lab_address' (D25)
  // 'social_media_links' (D25)
});
export const mediaTypeEnum = pgEnum('media_type', ['photo', 'video']);
// Skema Galeri (D16, D17, D21)
export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  // [PERBAIKAN]: Gunakan mediaTypeEnum yang sudah didefinisikan
  type: mediaTypeEnum('media_type_column').notNull(), // Tambahkan nama kolom 'media_type_column'
  mediaUrl: text('media_url').notNull(), // URL foto atau tautan video (D16, D17)
  description: text('description'),
  activityDate: timestamp('activity_date'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
