import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod/v4";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string) {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return Date.now() >= exp * 1000;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { // Type 'Promise<{ id: number; accessToken: any; refreshToken: any; } | null>' is not assignable to type 'Awaitable<User | null>'.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.access) return null;

        // Return the user object to store in the session
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
    strategy: "jwt",
  },
  trustHost: true,
  callbacks: {
    
    async jwt({ token, user }) {
      console.log('JWT callback - user:', user);
      console.log('JWT callback - token:', token);
      
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken; 
        token.refreshToken = user.refreshToken; 
        console.log('JWT callback - set user data:', { id: user.id, hasAccessToken: !!user.accessToken });
      } 
      
      if (token.accessToken && isTokenExpired(token.accessToken as string)) {
        console.log('JWT callback - token expired, refreshing...');
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: token.refreshToken }),
          });

          const refreshed = await res.json();

          if (res.ok) {
            token.accessToken = refreshed.access;
            token.error = null;
            console.log('JWT callback - token refreshed successfully');
          } else {
            console.log("Token refresh failed", refreshed);
            token.error = "RefreshAccessTokenError";
          }
        } catch (err) {
          console.log("Refresh error", err);
          token.error = "RefreshAccessTokenError";
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token);
      console.log('Session callback - session before:', session);
      
      if (token) {
        session.user.id = String(token.id);
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.error = token.error as string;
        console.log('Session callback - session after:', session);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Optional: custom login page
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})