import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { news } from '@/db/schema';
import { desc } from 'drizzle-orm';

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
    const { title, slug, content, imageUrl, isFeatured } = body;

    // Validation
    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    if (!slug || !slug.trim()) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }
    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }

    const [created] = await db
      .insert(news)
      .values({
        title: title.trim(),
        slug: slug.trim(),
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
