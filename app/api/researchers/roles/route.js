import { db } from '@/db/db';
import { researchers, researcherRoles } from '@/db/schema';
import { eq, asc, desc, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const roles = await db
      .select()
      .from(researcherRoles)
      .orderBy(asc(researcherRoles.order));

    return NextResponse.json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Role name is required' },
        { status: 400 }
      );
    }

    const maxOrderResult = await db
      .select({ maxOrder: sql`COALESCE(MAX(${researcherRoles.order}), 0)` })
      .from(researcherRoles);

    const nextOrder = (maxOrderResult[0]?.maxOrder || 0) + 1;

    const [newRole] = await db
      .insert(researcherRoles)
      .values({
        name: name.trim(),
        order: nextOrder,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newRole,
    });
  } catch (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Role name already exists' },
        { status: 409 }
      );
    }
    console.error('Error creating role:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, order, reorderData } = body;

    if (reorderData) {
      await db.transaction(async (tx) => {
        for (const item of reorderData) {
          await tx
            .update(researcherRoles)
            .set({ order: item.order, updatedAt: new Date() })
            .where(eq(researcherRoles.id, item.id));
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Roles reordered successfully',
      });
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }

    const updateData = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name.trim();
    if (order !== undefined) updateData.order = order;

    const [updatedRole] = await db
      .update(researcherRoles)
      .set(updateData)
      .where(eq(researcherRoles.id, id))
      .returning();

    if (!updatedRole) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedRole,
    });
  } catch (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Role name already exists' },
        { status: 409 }
      );
    }
    console.error('Error updating role:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const roleId = searchParams.get('id');

    if (!roleId) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }

    const [roleToDelete] = await db
      .select()
      .from(researcherRoles)
      .where(eq(researcherRoles.id, parseInt(roleId)));

    if (!roleToDelete) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }

    const fallbackRole = await db
      .select()
      .from(researcherRoles)
      .orderBy(asc(researcherRoles.order))
      .limit(1);

    if (fallbackRole.length === 0 || fallbackRole[0].id === parseInt(roleId)) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete the only role' },
        { status: 400 }
      );
    }

    const result = await db
      .update(researchers)
      .set({ role: fallbackRole[0].name })
      .where(eq(researchers.role, roleToDelete.name))
      .returning();

    await db
      .delete(researcherRoles)
      .where(eq(researcherRoles.id, parseInt(roleId)));

    return NextResponse.json({
      success: true,
      message: `Role deleted. ${result.length} researchers updated to '${fallbackRole[0].name}'`,
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
