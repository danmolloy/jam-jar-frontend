'use client'
import { IoMdAdd } from "react-icons/io";

import Link from "next/link"
import { useState } from "react";

export default function AddPracticeBtn() {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className="relative ">
      <button onClick={() => setShowMenu(!showMenu)} className="shadow hover:cursor-pointer p-2 bg-white text-black mt-1 hover:text-blue-500 font-mono flex flex-row items-center justify-center">
        <p className="mr-1">New</p><IoMdAdd />
      </button>
      {showMenu &&<div className="absolute  flex flex-col bg-white shadow right-0">

    <Link href={"/items/create"} className="p-2 hover:text-blue-500">
      Practice
    </Link>
    <Link href={"/audio/create"} className="p-2 hover:text-blue-500">
      Recording
    </Link>
    <Link href={"/diary/create"} className="p-2 hover:text-blue-500">
        Diary Entry
    </Link>
      </div>}
    </div>
  )
}