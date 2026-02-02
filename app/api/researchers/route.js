import { db } from '@/db/db';
import { researchers } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get('search');
    const role = searchParams.get('role');

    let query = db.select().from(researchers);

    if (search) {
      query = query.where(ilike(researchers.name, `%${search}%`));
    }

    if (role) {
      query = query.where(eq(researchers.role, role));
    }

    const result = await query;

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error fetching researchers:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      role,
      expertise,
      affiliation,
      email,
      avatarUrl,
      description,
    } = body;

    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(researchers)
      .values({
        name,
        role,
        expertise: expertise || null,
        affiliation: affiliation || null,
        email,
        avatarUrl: avatarUrl || null,
        description: description || null,
        isActive: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Error creating researcher:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
