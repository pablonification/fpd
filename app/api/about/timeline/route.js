
import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { organizationTimeline } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
    try {
        const data = await db
            .select()
            .from(organizationTimeline)
            .orderBy(desc(organizationTimeline.createdAt)); // or sort by year if parseable, but createdAt is safer for now or just generic list

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        // Support adding one item
        if (body.year && body.description) {
            const newItem = await db.insert(organizationTimeline).values({
                year: body.year,
                description: body.description
            }).returning();
            return NextResponse.json({ success: true, data: newItem[0] });
        }
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to add timeline item' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await db.delete(organizationTimeline).where(eq(organizationTimeline.id, id));
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
