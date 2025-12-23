import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { galleryItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/gallery/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const rows = await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.id, parseInt(id)))
      .limit(1);
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

// PUT /api/gallery/[id]
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, type, mediaUrl, activityDate, category } = body;

    const updateValues = {
      title: title ?? null,
      description: description ?? null,
      type: type ? type.toLowerCase() : undefined,
      mediaUrl: mediaUrl ?? undefined,
      category: category ?? undefined,
      activityDate: activityDate ? new Date(activityDate) : undefined,
    };

    // Remove undefined keys to avoid overwriting unintentionally
    Object.keys(updateValues).forEach(
      (k) => updateValues[k] === undefined && delete updateValues[k]
    );

    const updated = await db
      .update(galleryItems)
      .set(updateValues)
      .where(eq(galleryItems.id, parseInt(id)))
      .returning();

    if (!updated || updated.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deleted = await db
      .delete(galleryItems)
      .where(eq(galleryItems.id, parseInt(id)))
      .returning();
    if (!deleted || deleted.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete item' },
      { status: 500 }
    );
  }
}
