'use client'

import { signOut } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

export default function SessionMenu() {
      const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className=" flex flex-col items-center justify-center font-mono">
        <button 
          className="hover:text-amber-600 hover:cursor-pointer p-2 rounded"
         onBlur={() => setTimeout(() => setShowMenu(false), 250)}
          onClick={(e) => {
            e.preventDefault();
            focus();
            setShowMenu(!showMenu); 
          }}>
                <IoIosMenu size={20}/>
              </button>
    {showMenu && <div className="fixed bg-white right-0 top-12  pb-24  flex flex-col justify-between  w-screen h-[95vh] z-10 py-8">
      <Link href={"/"} className="p-3   text-start hover:underline">Home</Link>
{/*       <Link href="/items" className="p-3 py-6 hover:bg-amber-200 text-start">Practice</Link>
 */}      {/* <Link href="/achievements" className="p-3 py-6 hover:bg-amber-200 text-start">Achievements</Link> */}

{/*       <Link href={'/goals/create'} className="p-3 py-6 hover:bg-amber-200 text-start">Create Goal</Link>
 */}            <Link href={'/settings'} className="p-3   text-start hover:underline">Settings</Link>
      <button onClick={() => signOut()} className="p-3   text-start hover:cursor-pointer hover:underline">Log Out</button>
    </div>}
    </div>
  )
}