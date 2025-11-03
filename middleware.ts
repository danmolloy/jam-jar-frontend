import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

// Define protected routes that require authentication
const protectedRoutes = [
  '/account',
  '/achievements',
  '/audio',
  '/diary',
  '/goals',
  '/items',
  '/settings',
];

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/reset-password',
  '/confirm-email',
  '/privacy',
  '/terms',
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Skip middleware for API routes and static files
  if (
    nextUrl.pathname.startsWith('/api/') ||
    nextUrl.pathname.startsWith('/_next/') ||
    nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));

  // If user is not logged in and trying to access a protected route
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL('/login', nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
});

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
