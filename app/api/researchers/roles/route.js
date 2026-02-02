import { db } from '@/db/db';
import { researchers, PREDEFINED_RESEARCHER_ROLES } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const roleToDelete = searchParams.get('role');

    if (!roleToDelete) {
      return NextResponse.json(
        { success: false, error: 'Role is required' },
        { status: 400 }
      );
    }

    if (PREDEFINED_RESEARCHER_ROLES.includes(roleToDelete)) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete predefined roles' },
        { status: 400 }
      );
    }

    const fallbackRole = 'Collaborator';

    const result = await db
      .update(researchers)
      .set({ role: fallbackRole })
      .where(eq(researchers.role, roleToDelete))
      .returning();

    return NextResponse.json({
      success: true,
      message: `Role deleted. ${result.length} researchers updated to '${fallbackRole}'`,
      updatedCount: result.length,
    });
  } catch (error) {
    console.error('Error deleting role:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
