import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { projects, projectMedia } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET single project by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const project = await db.query.projects.findFirst({
      where: eq(projects.id, parseInt(id)),
      with: {
        media: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
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
      images, // Array of image URLs
    } = body;

    const projectId = parseInt(id);

    const result = await db.transaction(async (tx) => {
      const updatedProject = await tx
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
        .where(eq(projects.id, projectId))
        .returning();

      if (!updatedProject || updatedProject.length === 0) {
        throw new Error('Project not found');
      }

      // Update media: delete existing and insert new
      if (images && Array.isArray(images)) {
        await tx.delete(projectMedia).where(eq(projectMedia.projectId, projectId));

        if (images.length > 0) {
          await tx.insert(projectMedia).values(
            images.map((url) => ({
              projectId,
              url,
            }))
          );
        }
      }

      return updatedProject[0];
    });

    return NextResponse.json({
      success: true,
      data: result,
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

    // Media will be deleted automatically due to cascade reference in schema
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
