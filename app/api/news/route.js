import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { news } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

async function generateUniqueSlug(title, currentId = null) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await db
      .select({ id: news.id })
      .from(news)
      .where(eq(news.slug, slug))
      .limit(1);

    if (existing.length === 0 || (currentId && existing[0].id === currentId)) {
      isUnique = true;
    } else {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  return slug;
}

// GET /api/news - list news items
export async function GET(request) {
  try {
    const items = await db.select().from(news).orderBy(desc(news.createdAt));

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST /api/news - create a new item
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, imageUrl, isFeatured } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }

    const uniqueSlug = await generateUniqueSlug(title);

    const [created] = await db
      .insert(news)
      .values({
        title: title.trim(),
        slug: uniqueSlug,
        content: content.trim(),
        imageUrl: imageUrl?.trim() || null,
        isFeatured: isFeatured || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create news' },
      { status: 500 }
    );
  }
}
