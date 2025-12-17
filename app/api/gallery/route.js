import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { galleryItems } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/gallery - list items (optionally filter by type or date)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'photo' | 'video'
    const year = searchParams.get('year');

    let query = db
      .select()
      .from(galleryItems)
      .orderBy(desc(galleryItems.createdAt));

    // Simple filters: type, year from activityDate
    // Note: drizzle-orm basic conditions example; extend as needed
    // If stricter filter chaining is needed, build conditions and .where(and(...))

    const items = await query;

    const filtered = items.filter((i) => {
      const okType = type ? i.type === type : true;
      const okYear = year
        ? i.activityDate
          ? new Date(i.activityDate).getFullYear().toString() === year
          : false
        : true;
      return okType && okYear;
    });

    return NextResponse.json({ success: true, data: filtered });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - create a new item
export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📥 Received body:', body);

    const { title, description, type, mediaUrl, activityDate } = body;

    console.log('🔍 Extracted values:', {
      title,
      description,
      type,
      mediaUrl,
      activityDate,
    });

    // Basic validation
    const normalizedType = (type || '').toLowerCase();
    if (!['photo', 'video'].includes(normalizedType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be "photo" or "video".' },
        { status: 400 }
      );
    }
    if (!mediaUrl || !mediaUrl.trim()) {
      return NextResponse.json(
        { success: false, error: 'mediaUrl is required' },
        { status: 400 }
      );
    }

    const valuesToInsert = {
      title: title?.trim() || null,
      description: description?.trim() || null,
      type: normalizedType, // Use 'type' as defined in schema, not 'media_type_column'
      mediaUrl: mediaUrl.trim(), // Use 'mediaUrl' as defined in schema, not 'media_url'
      activityDate: activityDate ? new Date(activityDate) : null,
      createdAt: new Date(),
    };

    console.log('💾 Values to insert:', valuesToInsert);

    const [created] = await db
      .insert(galleryItems)
      .values(valuesToInsert)
      .returning();

    console.log('✅ Created:', created);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
