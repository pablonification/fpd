
import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect /dashboard path
    if (pathname.startsWith('/dashboard')) {
        const sessionCookie = request.cookies.get('admin_session');

        if (!sessionCookie) {
            // Redirect to login if no session
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const session = JSON.parse(sessionCookie.value);
            // Check for admin role
            if (session.role !== 'admin') {
                // Redirect to login (or unauthorized page) if not admin
                // For now, back to login
                const loginUrl = new URL('/login', request.url);
                return NextResponse.redirect(loginUrl);
            }
        } catch (e) {
            // Invalid cookie format
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
