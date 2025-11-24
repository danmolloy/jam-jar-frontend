'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

export default function ExternalMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className=" flex flex-col items-center justify-center ">
      <button
        className=" hover:border hover:cursor-pointer p-1 rounded-full"
        onBlur={() => setTimeout(() => setShowMenu(false), 250)}
        onClick={(e) => {
          e.preventDefault();
          focus();
          setShowMenu(!showMenu);
        }}
      >
        <IoIosMenu size={20} />
      </button>
      {showMenu && (
        <div className="fixed right-0 top-12 pb-32 text-white flex flex-col justify-evenly bg-dark w-screen h-[95vh]  z-10 py-8 text-2xl font-base  font-mono">
          <Link
            href={'/'}
            onClick={() => setTimeout(() => setShowMenu(false), 250)}
            className="px-4 mx-4 hover:underline text-start rounded"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setTimeout(() => setShowMenu(false), 250)}
            className="px-4 mx-4 hover:underline text-start rounded"
          >
            About
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setTimeout(() => setShowMenu(false), 250)}
            className="px-4 mx-4 hover:underline text-start rounded"
          >
            Pricing
          </Link>
          <Link
            href="/#contact"
            onClick={() => setTimeout(() => setShowMenu(false), 250)}
            className="px-4 mx-4  hover:underline text-start rounded"
          >
            Contact
          </Link>
          <Link
            href="/login"
            onClick={() => setTimeout(() => setShowMenu(false), 250)}
            className="px-4 mx-4 hover:underline text-start rounded"
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}
