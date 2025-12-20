
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully',
    });

    // Delete the session cookie by setting it to expire immediately
    response.cookies.set('admin_session', '', {
        httpOnly: true, // Match the attributes used when setting it
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(0), // Expire immediately
    });

    return response;
}
