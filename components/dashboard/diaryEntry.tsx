import { components } from "@/types/api"
import { DateTime } from "luxon"
import Link from "next/link"
import { MdEdit } from "react-icons/md"

type DiaryEntry = components["schemas"]["DiaryEntry"]

export default function DiaryEntry({diaryEntry}: {
  diaryEntry: DiaryEntry
}) {
  return (
    <div key={diaryEntry.id} className="text-sm p-1 border-b border-gray-300 ">
            <div className="flex flex-row justify-between items-center ">
              <p className="font-medium text-base text-start">{diaryEntry.title}</p>
              <div className="flex flex-row items-center">
              <p className="">{DateTime.fromISO(diaryEntry.date).toFormat('HH:mm dd LLL yyyy')}</p>
              <Link href={`/diary/${diaryEntry.id}/update/`} className="mx-2">
              
                <MdEdit />
              </Link>
              </div>
            </div>
            <p>{diaryEntry.body}</p>
          </div>
  )
}