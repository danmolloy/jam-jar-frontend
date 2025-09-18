'use client'
import { useSession } from "next-auth/react";
import SessionMenu from "./sessionMenu";
import ExternalMenu from "./externalMenu";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  
  // Debug logging (remove in production)
  console.log('Header - Session status:', status);
  console.log('Header - Session data:', session);
  console.log('Header - Session error:', session?.error);
  console.log('Header - Access token exists:', !!session?.accessToken);
  
  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="fixed w-screen flex flex-row h-12 justify-between px-4 z-20 items-center md:backdrop-blur-xs border-b border-black">
        <Link href={"/"} className="font-display text-lg font-bold">Jam Jar</Link>
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed w-screen flex flex-row h-12 justify-between px-4 z-20 items-center md:backdrop-blur-xs border-b border-black text-white mix-blend-difference">
      <Link href={"/"} className="font-display text-lg font-bold mix-blend-difference ">Jam Jar</Link>
      {(!session || session.error === "RefreshAccessTokenError" || !session.accessToken) 
        ? <ExternalMenu /> 
        : <SessionMenu />}
    </div>
  )
}