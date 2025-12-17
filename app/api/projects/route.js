import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { projects } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET all projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let query = db.select().from(projects);

    // Apply filters if provided
    let conditions = [];
    if (year) {
      conditions.push(eq(projects.year, year));
    }
    if (status) {
      conditions.push(eq(projects.status, status.toLowerCase()));
    }

    const allProjects = await query.orderBy(desc(projects.createdAt));

    // Filter by category (researcher type) if provided
    let filteredProjects = allProjects;
    if (category && category !== 'All') {
      filteredProjects = allProjects.filter(
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
    } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const newProject = await db
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

    return NextResponse.json({
      success: true,
      data: newProject[0],
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
