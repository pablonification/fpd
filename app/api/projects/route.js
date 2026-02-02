import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { projects, projectMedia } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const allProjects = await db.query.projects.findMany({
      with: {
        media: true,
      },
      orderBy: [desc(projects.createdAt)],
    });

    let filteredProjects = allProjects;
    if (status) {
      filteredProjects = filteredProjects.filter(
        (p) => p.status === status.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create new project
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, status, abstract, results, author, doi, images } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const result = await db.transaction(async (tx) => {
      const newProject = await tx
        .insert(projects)
        .values({
          title,
          status: status?.toLowerCase() || 'upcoming',
          abstract: abstract || null,
          results: results || null,
          author: author || null,
          doi: doi || null,
        })
        .returning();

      const projectId = newProject[0].id;

      if (images && Array.isArray(images) && images.length > 0) {
        await tx.insert(projectMedia).values(
          images.map((url) => ({
            projectId,
            url,
          }))
        );
      }

      return newProject[0];
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
