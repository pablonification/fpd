import { db } from '@/db/db';
import { users } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { desc } from 'drizzle-orm';

export async function GET(req) {
  try {
    const data = await db.select().from(users).orderBy(desc(users.createdAt));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Fetch Users Error:', error);
    return new Response(JSON.stringify([]), { status: 200 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role, isActive, avatar } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // 1. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2. Insert using Drizzle (Bypasses Supabase RLS policies)
    const [newUser] = await db.insert(users).values({
      name,
      email,
      passwordHash: hashedPassword,
      role,
      isActive: isActive ?? true,
      avatarUrl: avatar,
    }).returning();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    console.error('Drizzle Insert Error:', err);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
