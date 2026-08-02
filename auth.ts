import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token: string) {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return Date.now() >= exp * 1000;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.access) return null;

        const decoded = jwtDecode<{ user_id: number }>(data.access);

        return {
          id: decoded.user_id.toString(),
          accessToken: data.access,
          refreshToken: data.refresh,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (token.accessToken && isTokenExpired(token.accessToken as string)) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: token.refreshToken }),
          });

          const refreshed = await res.json();

          if (res.ok) {
            token.accessToken = refreshed.access;
            token.error = null;
          } else {
            token.error = 'RefreshAccessTokenError';
          }
        } catch (err) {
          console.error('Refresh error', err);
          token.error = 'RefreshAccessTokenError';
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token.id);
        session.accessToken = token.accessToken as string;
        session.error = token.error as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Optional: custom login page
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
