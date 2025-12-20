import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { projects, projectMedia } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET all projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    // Using relational query to include media
    const allProjects = await db.query.projects.findMany({
      with: {
        media: true,
      },
      orderBy: [desc(projects.createdAt)],
    });

    // Filter by year if provided
    let filteredProjects = allProjects;
    if (year) {
      filteredProjects = filteredProjects.filter((p) => p.year === year);
    }

    // Filter by status if provided
    if (status) {
      filteredProjects = filteredProjects.filter(
        (p) => p.status === status.toLowerCase()
      );
    }

    // Filter by category (researcher type) if provided
    if (category && category !== 'All') {
      filteredProjects = filteredProjects.filter(
        (p) => p.researcherCategory === category
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

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    // Use a transaction for consistency
    const result = await db.transaction(async (tx) => {
      const newProject = await tx
        .insert(projects)
        .values({
          title,
          year: year || null,
          status: status?.toLowerCase() || 'upcoming',
          description: description || null,
          results: results || null,
          principalInvestigator: principalInvestigator || null,
          researcherCategory: researcherCategory || null,
        })
        .returning();

      const projectId = newProject[0].id;

      // Insert media if provided
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
