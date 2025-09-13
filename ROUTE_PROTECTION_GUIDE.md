# Route Protection Guide

This guide explains how route protection is implemented in your Next.js application and how to use the authentication utilities.

## Overview

Your application has multiple layers of route protection:

1. **Middleware-based protection** - Server-side route protection using Next.js middleware
2. **Server component protection** - Using `requireAuth()` utility in server components
3. **Client component protection** - Using `useRequireAuth()` hook in client components
4. **Higher-order component protection** - Using `ProtectedRoute` wrapper

## Middleware Protection

The middleware (`middleware.ts`) automatically protects routes defined in the `protectedRoutes` array:

```typescript
const protectedRoutes = [
  '/account',
  '/achievements', 
  '/audio',
  '/diary',
  '/goals',
  '/items',
  '/settings'
];
```

### Features:
- Automatically redirects unauthenticated users to `/login`
- Preserves the original URL as `callbackUrl` for post-login redirect
- Prevents authenticated users from accessing login/register pages
- Handles query parameters in redirects

## Server Component Protection

For server components, use the `requireAuth()` utility:

```typescript
import { requireAuth } from '@/lib/auth-utils';

export default async function MyProtectedPage() {
  const session = await requireAuth(); // Will redirect if not authenticated
  
  // Your component logic here
  return <div>Protected content</div>;
}
```

### Alternative: Conditional rendering
```typescript
import { getAuthSession } from '@/lib/auth-utils';

export default async function MyPage() {
  const session = await getAuthSession();
  
  if (!session) {
    return <div>Please log in to view this content</div>;
  }
  
  return <div>Protected content</div>;
}
```

## Client Component Protection

For client components, use the `useRequireAuth()` hook:

```typescript
'use client';
import { useRequireAuth } from '@/lib/use-auth';

export default function MyClientComponent() {
  const { session, isLoading } = useRequireAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Protected content</div>;
}
```

### Alternative: Using ProtectedRoute wrapper
```typescript
'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function MyClientComponent() {
  return (
    <ProtectedRoute fallback={<div>Loading...</div>}>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}
```

## Best Practices

1. **Use middleware for route-level protection** - This is the most efficient approach
2. **Use server-side utilities for server components** - Better performance and SEO
3. **Use client-side hooks for interactive components** - Better UX with loading states
4. **Always handle loading states** - Provide feedback while checking authentication
5. **Handle errors gracefully** - Show appropriate messages for authentication failures

## Route Configuration

### Protected Routes
These routes require authentication:
- `/account` - User account management
- `/achievements` - User achievements
- `/audio` - Audio recordings
- `/diary` - Diary entries
- `/goals` - Practice goals
- `/items` - Practice items
- `/settings` - User settings

### Public Routes
These routes don't require authentication:
- `/` - Home page (shows landing or dashboard based on auth status)
- `/login` - Login page
- `/register` - Registration page
- `/reset-password` - Password reset
- `/confirm-email` - Email confirmation
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Testing Route Protection

To test that route protection is working:

1. **Without authentication:**
   - Try accessing `/settings` - should redirect to `/login`
   - Try accessing `/goals` - should redirect to `/login`
   - Check that `callbackUrl` parameter is preserved

2. **With authentication:**
   - Try accessing `/login` - should redirect to `/` or callback URL
   - Try accessing `/register` - should redirect to `/` or callback URL
   - Protected routes should be accessible

3. **Edge cases:**
   - Test with expired tokens
   - Test with invalid tokens
   - Test with network errors

## Troubleshooting

### Common Issues:

1. **Infinite redirects:** Check that public routes are properly configured
2. **Middleware not running:** Verify the `matcher` configuration in middleware
3. **Session not persisting:** Check NextAuth configuration and session strategy
4. **Token refresh issues:** Verify the JWT callback and token refresh logic

### Debug Tips:

1. Check browser network tab for redirects
2. Check server logs for middleware execution
3. Use browser dev tools to inspect session state
4. Test with different authentication states
