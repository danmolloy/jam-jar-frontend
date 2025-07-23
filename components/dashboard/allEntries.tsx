import { components } from "@/types/api"
import { DateTime } from "luxon"
import Link from "next/link";
import {  MdEdit } from "react-icons/md";


type Entry = components['schemas']['DiaryEntry']

export default function AllEntries({entries}: {
  entries: Entry[]
}) {
  return (
    <div className=" rounded p-4  shadow m-2 bg-white">
      <h2>All Diary Entries</h2>
      <div className="border-t border-gray-300">
        {entries.length < 1 
        ?  <p>No Entries</p>
        : entries.map(i => (
          <div key={i.id} className="text-sm p-1 border-b border-gray-300 w-full ">
            <div className="flex flex-row justify-between items-center ">
              <p className="font-medium text-base text-start">{i.title}</p>
              <div className="flex flex-row items-center">
              <p className="">{DateTime.fromISO(i.date).toFormat('HH:mm dd LLL yyyy')}</p>
              <Link href={`/diary/${i.id}/update/`} className="mx-2">
              
                <MdEdit />
              </Link>
              </div>
            </div>
            <p>{i.body}</p>
          </div>
        ))}
      </div>
      </div>
  )
}