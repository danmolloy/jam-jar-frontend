import { auth } from '@/auth';
import { redirect } from 'next/navigation';

/**
 * Server-side authentication check utility
 * Use this in server components to ensure user is authenticated
 * @param redirectTo - Optional redirect path if not authenticated (defaults to '/login')
 * @returns Promise<Session> - The authenticated session
 */
export async function requireAuth(redirectTo: string = '/login') {
  const session = await auth();
  
  if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
    redirect(redirectTo);
  }
  
  return session;
}

/**
 * Server-side authentication check with custom error handling
 * Use this when you want to handle the unauthenticated case differently
 * @returns Promise<Session | null> - The session or null if not authenticated
 */
export async function getAuthSession() {
  const session = await auth();
  
  if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
    return null;
  }
  
  return session;
}

/**
 * Check if a route should be protected
 * @param pathname - The current pathname
 * @returns boolean - Whether the route should be protected
 */
export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/account',
    '/achievements', 
    '/audio',
    '/diary',
    '/goals',
    '/items',
    '/settings'
  ];
  
  return protectedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Check if a route is public (doesn't require authentication)
 * @param pathname - The current pathname
 * @returns boolean - Whether the route is public
 */
export function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/reset-password',
    '/confirm-email',
    '/privacy',
    '/terms'
  ];
  
  return publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
}
