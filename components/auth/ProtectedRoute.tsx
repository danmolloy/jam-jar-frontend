'use client';

import { useRequireAuth } from '@/lib/use-auth';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * Higher-order component for protecting client-side routes
 * Automatically redirects to login if user is not authenticated
 * @param children - The component to render if authenticated
 * @param fallback - Optional loading component to show while checking auth
 * @param redirectTo - Where to redirect if not authenticated (default: '/login')
 */
export default function ProtectedRoute({ 
  children, 
  fallback = <div>Loading...</div>, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isLoading } = useRequireAuth(redirectTo);
  
  if (isLoading) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}
