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
    {showMenu && <div className="fixed right-0 top-12 pb-32  flex flex-col justify-start bg-white w-screen h-[95vh] z-10 py-8 text-lg font-medium">
      <Link href={"/"} onClick={() =>setTimeout(() => setShowMenu(false), 250)} className="p-4 py-8 mx-4  hover:outline hover:bg-primary hover:underline text-start">HOME</Link>
      <Link href="/#about" onClick={() => setTimeout(() => setShowMenu(false), 250)} className="p-4 py-8 mx-4 hover:outline  hover:bg-primary hover:underline text-start">ABOUT</Link>
      <Link href="/#pricing" onClick={() => setTimeout(() => setShowMenu(false), 250)} className="p-4 py-8 mx-4 hover:outline  hover:bg-primary hover:underline text-start">PRICING</Link>
      <Link href="/#contact" onClick={() => setTimeout(() => setShowMenu(false), 250)} className="p-4 py-8 mx-4 hover:outline   hover:bg-primary hover:underline text-start">CONTACT</Link>
      <Link href="/login" onClick={() =>setTimeout(() => setShowMenu(false), 250)} className="p-4 py-8 mx-4 hover:outline  hover:bg-primary hover:underline text-start">LOG IN</Link>
    </div>}
    </div>
  )
}