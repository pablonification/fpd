
import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { staticContent } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function GET() {
    try {
        const keys = ['contact_email', 'contact_address', 'contact_links'];
        const rows = await db
            .select()
            .from(staticContent)
            .where(inArray(staticContent.contentKey, keys));

        const data = {
            email: '',
            address: '',
            links: [],
        };

        rows.forEach((row) => {
            if (row.contentKey === 'contact_email') data.email = row.content;
            if (row.contentKey === 'contact_address') data.address = row.content;
            if (row.contentKey === 'contact_links') {
                try {
                    data.links = JSON.parse(row.content);
                } catch {
                    data.links = [];
                }
            }
        });

        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { email, address, links } = await request.json();

        // Helper to upsert
        const upsert = async (key, value) => {
            const existing = await db
                .select()
                .from(staticContent)
                .where(eq(staticContent.contentKey, key))
                .limit(1);

            if (existing.length > 0) {
                await db
                    .update(staticContent)
                    .set({ content: value })
                    .where(eq(staticContent.contentKey, key));
            } else {
                await db.insert(staticContent).values({ contentKey: key, content: value });
            }
        };

        if (email !== undefined) await upsert('contact_email', email);
        if (address !== undefined) await upsert('contact_address', address);
        if (links !== undefined) await upsert('contact_links', JSON.stringify(links));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
    }
}
