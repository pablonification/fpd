import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users, projects, galleryItems, news, researchers } from '@/db/schema';
import { count, eq, sql, desc } from 'drizzle-orm';

export async function GET() {
  try {
    // 1. Fetch Counts
    const [activeResearchersCount] = await db
      .select({ count: count() })
      .from(researchers)
      .where(eq(researchers.isActive, true));

    const [ongoingProjectsCount] = await db
      .select({ count: count() })
      .from(projects)
      .where(eq(projects.status, 'ongoing'));

    const [completedProjectsCount] = await db
      .select({ count: count() })
      .from(projects)
      .where(eq(projects.status, 'completed'));

    const [activeUsersCount] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.isActive, true));

    const [galleryCount] = await db
      .select({ count: count() })
      .from(galleryItems);

    const [newsCount] = await db.select({ count: count() }).from(news);

    const [totalProjectsCount] = await db
      .select({ count: count() })
      .from(projects);

    // 2. Fetch Latest Updates (Mixed Feed)
    const recentResearchers = await db
      .select({
        id: researchers.id,
        title: researchers.name,
        updatedAt: researchers.updatedAt,
        type: sql`'researcher'`,
      })
      .from(researchers)
      .orderBy(desc(researchers.updatedAt))
      .limit(3);

    const recentGallery = await db
      .select({
        id: galleryItems.id,
        title: galleryItems.title,
        updatedAt: galleryItems.createdAt,
        type: sql`'gallery'`,
      })
      .from(galleryItems)
      .orderBy(desc(galleryItems.createdAt))
      .limit(3);

    const recentNews = await db
      .select({
        id: news.id,
        title: news.title,
        updatedAt: news.createdAt,
        type: sql`'news'`,
      })
      .from(news)
      .orderBy(desc(news.createdAt))
      .limit(3);

    const latestUpdates = [
      ...recentResearchers,
      ...recentGallery,
      ...recentNews,
    ]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
      .map((item) => {
        let text = '';
        if (item.type === 'researcher')
          text = `Researcher profile updated: ${item.title}`;
        if (item.type === 'gallery')
          text = `New media added: ${item.title || 'Untitled'}`;
        if (item.type === 'news') text = `News published: ${item.title}`;
        return {
          id: `${item.type}-${item.id}`,
          text,
          time: item.updatedAt,
        };
      });

    return NextResponse.json({
      success: true,
      data: {
        researchers: {
          active: activeResearchersCount.count,
        },
        projects: {
          ongoing: ongoingProjectsCount.count,
          completed: completedProjectsCount.count,
          total: totalProjectsCount.count,
        },
        users: {
          active: activeUsersCount.count,
        },
        gallery: {
          total: galleryCount.count,
        },
        news: {
          published: newsCount.count,
        },
        latestUpdates,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
