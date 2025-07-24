// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED = process.env.NEXT_PUBLIC_ALLOWED_IPS ? process.env.NEXT_PUBLIC_ALLOWED_IPS.split(',') : [];

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const xff = req.headers.get('x-forwarded-for') || '';
  const clientIP = xff.split(',')[0].trim();

  // 1) Always allow local dev
  if (process.env.NODE_ENV === 'development' || host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  // 2) Otherwise enforce your IP whitelist
  if (!ALLOWED.includes(clientIP)) {
    return new NextResponse(`<h1>Access Denied</h1><p>Your IP (${clientIP}) is not allowed.</p>`, { status: 403, headers: { 'Content-Type': 'text/html' } });
  }

  return NextResponse.next();
}

export const config = {
  // apply to all paths
  matcher: '/:path*',
};
