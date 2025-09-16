import { components } from "@/types/api"
import Link from "next/link";
import DiaryEntry from "./diaryEntry";


type Entry = components['schemas']['DiaryEntry']

export default function AllEntries({entries, isPremium}: {
  entries: Entry[]
  isPremium: boolean
}) {
  return (
    <div className=" rounded p-4  shadow m-2 bg-white lg:w-1/2 ">
      <h2>ALL DIARY ENTRIES</h2>
      <div className="border-t border-gray-300">
        {entries.length < 1 
        ?  <div className="flex flex-col items-center justify-center px-2 py-4">
          <p className="font-semibold">No entries.</p>
          <p>You haven&apos;t saved any diary entries.</p>
          <Link className="text-blue-600 hover:underline" href="/diary/create/">Create an entry</Link>
          </div>
        : entries.map(i => (
          <DiaryEntry key={i.id} diaryEntry={i}/>
        ))}
      </div>
      </div>
  )
}