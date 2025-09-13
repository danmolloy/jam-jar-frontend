'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client-side authentication hook
 * Provides authentication state and automatic redirects
 * @param requireAuth - Whether to redirect if not authenticated (default: false)
 * @param redirectTo - Where to redirect if not authenticated (default: '/login')
 * @returns Object with session, loading state, and authentication status
 */
export function useAuth(requireAuth: boolean = false, redirectTo: string = '/login') {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isLoading = status === 'loading';
  const isAuthenticated = !!session && !session.error && !!session.accessToken;
  
  useEffect(() => {
    if (requireAuth && !isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [requireAuth, isLoading, isAuthenticated, router, redirectTo]);
  
  return {
    session,
    isLoading,
    isAuthenticated,
    error: session?.error
  };
}

/**
 * Hook for pages that require authentication
 * Automatically redirects to login if not authenticated
 * @param redirectTo - Where to redirect if not authenticated (default: '/login')
 * @returns Object with session and loading state
 */
export function useRequireAuth(redirectTo: string = '/login') {
  return useAuth(true, redirectTo);
}
