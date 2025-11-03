'use client';
import { IoMdAdd } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';

import Link from 'next/link';
import { useState } from 'react';

export default function AddPracticeBtn({
  subscriptionStatus,
}: {
  subscriptionStatus?: string | null;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative z-10">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className=" hover:cursor-pointer px-2 py-1 bg-white border text-black mt-1 hover:text-blue-600  flex flex-row  rounded items-center justify-center"
      >
        <p className="mr-1">New</p>
        <IoMdAdd />
      </button>
      {showMenu && (
        <div className="absolute  flex flex-col bg-white shadow right-0 w-32">
          <Link href={'/items/create'} className="p-2 hover:text-blue-500">
            Practice
          </Link>
          <Link href={'/diary/create'} className="p-2 hover:text-blue-500">
            Diary Entry
          </Link>
          {subscriptionStatus === 'active' ? (
            <Link href={'/audio/create'} className="p-2 hover:text-blue-500">
              Recording
            </Link>
          ) : (
            <button
              onClick={() => alert('Premium users only. Upgrade to add recordings.')}
              className="p-2 text-gray-400 flex flex-row items-center hover:cursor-pointer"
            >
              Recording
              <FaLock className="ml-2" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
