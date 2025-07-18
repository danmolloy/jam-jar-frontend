import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken: string
    refreshToken: string
    error?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    accessToken: string
    refreshToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
     id: string;
    accessToken: string
    refreshToken: string
  }
}