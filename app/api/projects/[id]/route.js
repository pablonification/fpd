import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET single project by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)))
      .limit(1);

    if (!project || project.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project[0],
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      year,
      status,
      description,
      results,
      principalInvestigator,
      researcherCategory,
    } = body;

    const updatedProject = await db
      .update(projects)
      .set({
        title,
        year: year || null,
        status: status?.toLowerCase() || 'upcoming',
        description: description || null,
        results: results || null,
        principalInvestigator: principalInvestigator || null,
        researcherCategory: researcherCategory || null,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, parseInt(id)))
      .returning();

    if (!updatedProject || updatedProject.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProject[0],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const deletedProject = await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id)))
      .returning();

    if (!deletedProject || deletedProject.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
