import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { news } from '@/db/schema';
import { eq } from 'drizzle-orm';

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

// GET /api/news/[id] - supports both numeric id and slug
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const isNumeric = /^\d+$/.test(id);

    let rows;
    if (isNumeric) {
      rows = await db
        .select()
        .from(news)
        .where(eq(news.id, parseInt(id)))
        .limit(1);
    } else {
      rows = await db.select().from(news).where(eq(news.slug, id)).limit(1);
    }

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// PUT /api/news/[id]
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);
    const body = await request.json();
    const { title, content, imageUrl, isFeatured } = body;

    const updateValues = {
      content: content?.trim() || undefined,
      imageUrl: imageUrl?.trim() || null,
      isFeatured: isFeatured !== undefined ? isFeatured : undefined,
      updatedAt: new Date(),
    };

    if (title?.trim()) {
      updateValues.title = title.trim();
      updateValues.slug = await generateUniqueSlug(title, numericId);
    }

    Object.keys(updateValues).forEach(
      (k) => updateValues[k] === undefined && delete updateValues[k]
    );

    const updated = await db
      .update(news)
      .set(updateValues)
      .where(eq(news.id, parseInt(id)))
      .returning();

    if (!updated || updated.length === 0) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

// DELETE /api/news/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deleted = await db
      .delete(news)
      .where(eq(news.id, parseInt(id)))
      .returning();
    if (!deleted || deleted.length === 0) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'News deleted' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}
