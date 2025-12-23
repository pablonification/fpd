import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { news } from '@/db/schema';
import { eq } from 'drizzle-orm';

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
    const body = await request.json();
    const { title, slug, content, imageUrl, isFeatured } = body;

    const updateValues = {
      title: title?.trim() || undefined,
      slug: slug?.trim() || undefined,
      content: content?.trim() || undefined,
      imageUrl: imageUrl?.trim() || null,
      isFeatured: isFeatured !== undefined ? isFeatured : undefined,
      updatedAt: new Date(),
    };

    // Remove undefined keys
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
