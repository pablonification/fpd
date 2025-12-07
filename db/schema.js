import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. PERBAIKAN: userRoleEnum hanya memiliki 3 peran
export const userRoleEnum = pgEnum('user_role', ['admin', 'viewer', 'editor']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: text('password_hash'),
  // Role diatur default ke 'viewer' (nilai yang valid di enum baru)
  role: userRoleEnum('role').notNull().default('viewer'),
  isActive: boolean('is_active').notNull().default(true),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projectStatusEnum = pgEnum('project_status', [
  'running',
  'completed',
  'upcoming',
]);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  year: varchar('year', { length: 4 }),
  status: projectStatusEnum('status').notNull().default('upcoming'),
  description: text('description'),
  results: text('results'),

  // Mengubah ke `integer` karena `serial` hanya boleh digunakan sebagai PK
  leadResearcherId: serial('lead_researcher_id').references(() => users.id),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  leadResearcher: one(users, {
    fields: [projects.leadResearcherId],
    references: [users.id],
  }),
  publications: many(publications),
}));

export const publications = pgTable('publications', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  authors: text('authors').notNull(),
  journalOrConference: text('journal_or_conference'),
  year: varchar('year', { length: 4 }),
  link: text('link'),
  isHighlighted: boolean('is_highlighted').default(false),

  // Mengubah ke `integer` karena `serial` hanya boleh digunakan sebagai PK
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
  // Mengubah ke `integer` karena `serial` hanya boleh digunakan sebagai PK
  projectId: serial('project_id').references(() => projects.id),
  // Mengubah ke `integer` karena `serial` hanya boleh digunakan sebagai PK
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

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const staticContent = pgTable('static_content', {
  id: serial('id').primaryKey(),
  contentKey: varchar('content_key', { length: 50 }).unique().notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content').notNull(),
});
export const mediaTypeEnum = pgEnum('media_type', ['photo', 'video']);

export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),

  type: mediaTypeEnum('media_type_column').notNull(),
  mediaUrl: text('media_url').notNull(),
  description: text('description'),
  activityDate: timestamp('activity_date'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  storagePath: varchar('storage_path', { length: 500 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
