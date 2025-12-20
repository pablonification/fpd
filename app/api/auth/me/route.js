
import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
    try {
        const sessionCookie = request.cookies.get('admin_session');

        if (!sessionCookie) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            );
        }

        try {
            const session = JSON.parse(sessionCookie.value);

            const user = await db.query.users.findFirst({
                where: eq(users.id, session.userId),
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    avatarUrl: true,
                }
            });

            if (!user) {
                return NextResponse.json(
                    { success: false, error: 'User not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                data: user,
            });

        } catch (e) {
            return NextResponse.json(
                { success: false, error: 'Invalid session' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Me error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
