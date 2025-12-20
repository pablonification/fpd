
import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
        }

        // 1. Find user with valid token and not expired
        const now = new Date();
        const user = await db.query.users.findFirst({
            where: and(
                eq(users.resetToken, token),
                gt(users.resetTokenExpiry, now)
            ),
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
        }

        // 2. Hash new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Update user and clear token
        await db.update(users)
            .set({
                passwordHash: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
                updatedAt: new Date(),
            })
            .where(eq(users.id, user.id));

        return NextResponse.json({
            success: true,
            message: 'Password has been reset successfully.'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
