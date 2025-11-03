'use client';
import { components } from '@/types/api';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

type DiaryEntry = components['schemas']['DiaryEntry'];

export default function DiaryEntry({ diaryEntry }: { diaryEntry: DiaryEntry }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div key={diaryEntry.id} className="text-sm py-1 border-b border-gray-300 flex flex-col">
      <div className="flex flex-col justify-between items-start w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-neutral-500">
            {DateTime.fromISO(diaryEntry.date).toFormat('HH:mm dd LLL yyyy')}
          </p>
          <Link href={`/diary/${diaryEntry.id}/update/`} className="mx-2">
            <MdEdit />
          </Link>
        </div>
        <div>
          <p className="font-semibold text-base text-start">{diaryEntry.title}</p>
        </div>
      </div>
      {diaryEntry.body.length < 200 ? (
        <div className="flex flex-col">
          <p>{diaryEntry.body}</p>
        </div>
      ) : (
        <div className="flex flex-row">
          {showAll ? (
            <div className="flex flex-row justify-between w-full">
              <p>{diaryEntry.body}</p>
              <button
                className="border rounded-lg self-end px-1 mx-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => setShowAll(!showAll)}
              >
                Less
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-between w-full">
              <p>{diaryEntry.body.slice(0, 200)}...</p>
              <button
                className="border rounded-lg self-end px-1 mx-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => setShowAll(!showAll)}
              >
                More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
