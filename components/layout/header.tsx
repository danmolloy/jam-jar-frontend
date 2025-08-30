import { auth } from "@/auth";
import SessionMenu from "./sessionMenu";
import ExternalMenu from "./externalMenu";
import Link from "next/link";

export default async function Header() {
      const session = await auth()
  


  return (
    <div className=" fixed w-screen flex flex-row h-12 justify-between px-4 z-20 items-center bg-white  border-b border-black">
      <Link href={"/"} className="font-display text-lg font-bold">Jam Jar</Link>
      {(!session || session.error === "RefreshAccessTokenError" || !session.accessToken) 
      ? <ExternalMenu /> 
      : <SessionMenu />}
    </div>
  )
}