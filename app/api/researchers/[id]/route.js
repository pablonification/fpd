import { db } from '@/db/db';
import { researchers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const result = await db
      .select()
      .from(researchers)
      .where(eq(researchers.id, parseInt(id)));

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Researcher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Error fetching researcher:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      role,
      expertise,
      affiliation,
      email,
      avatarUrl,
      description,
      isActive,
    } = body;

    const result = await db
      .update(researchers)
      .set({
        name: name || undefined,
        role: role || undefined,
        expertise: expertise || undefined,
        affiliation: affiliation || undefined,
        email: email || undefined,
        avatarUrl: avatarUrl || undefined,
        description: description || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        updatedAt: new Date(),
      })
      .where(eq(researchers.id, parseInt(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Researcher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Error updating researcher:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const result = await db
      .delete(researchers)
      .where(eq(researchers.id, parseInt(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Researcher not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Error deleting researcher:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
