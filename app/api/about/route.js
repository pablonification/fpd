import { staticContent } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { db } from '@/db/db';

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(staticContent)
      .where(
        inArray(staticContent.contentKey, [
          'about_description',
          'vision',
          'mission',
          'values',
        ])
      );

    const data = {};
    rows.forEach((row) => {
      data[row.contentKey] = row.content;
    });

    // Pastikan selalu mengembalikan JSON
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { about_description, vision, mission, values } = body;

  const keys = { about_description, vision, mission, values };

  // Loop untuk insert / update
  for (const key in keys) {
    const content = keys[key];

    // cek apakah key sudah ada
    const existing = await db
      .select()
      .from(staticContent)
      .where(eq(staticContent.contentKey, key))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(staticContent)
        .set({ content })
        .where(eq(staticContent.contentKey, key));
    } else {
      await db.insert(staticContent).values({ contentKey: key, content });
    }
  }

  return new Response(
    JSON.stringify({ message: 'About page updated successfully' }),
    { status: 200 }
  );
}
