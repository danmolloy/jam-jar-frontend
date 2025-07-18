import { components } from "@/types/api"
import { DateTime } from "luxon"

type DiaryEntry = components["schemas"]["DiaryEntry"]

export default function DiaryEntry({diaryEntry}: {
  diaryEntry: DiaryEntry
}) {
  return (
    <div>
      <h3>{diaryEntry.title}</h3>
      <p>{DateTime.fromISO(diaryEntry.date).toFormat("HH:mm dd LLL")}</p>
      <p>{diaryEntry.body}</p>
    </div>
  )
}