'use client'

import Link from "next/link"
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

export default function ExternalMenu() {
    const [showMenu, setShowMenu] = useState(false);

  
  return (
     <div className=" flex flex-col items-center justify-center font-mono">
        <button 
          className="hover:underline hover:cursor-pointer p-2 rounded"
         onBlur={() => setTimeout(() => setShowMenu(false), 250)}
          onClick={(e) => {
            e.preventDefault();
            focus();
            setShowMenu(!showMenu); 
          }}>
                <IoIosMenu size={20}/>
              </button>
    {showMenu && <div className="fixed right-0 top-12 pb-24 outline flex flex-col justify-between bg-white w-screen h-[95vh] z-10 py-8">
      <Link href={"/"} className="p-3  hover:underline text-start">Home</Link>
      <Link href="/#about" className="p-3  hover:underline text-start">About</Link>
      <Link href="/#pricing" className="p-3  hover:underline text-start">Pricing</Link>
      <Link href="/#contact" className="p-3  hover:underline text-start">Contact</Link>
      <Link href="/login" className="p-3  hover:underline text-start">Log In</Link>
    </div>}
    </div>
  )
}