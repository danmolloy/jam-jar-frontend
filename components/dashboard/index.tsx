'use client'
import { Session } from "next-auth"
import HeatMap from "../practice/heatMap"
import DaySelect from "./daySelect"
import StreakIndex from "./streak"
import AddPracticeBtn from "./addPracticeBtn"
import { useEffect, useState } from "react"
import ActivityFilter from "./activityFilter"
import { components } from "@/types/api"
import TagFilter from "./tagFilter"
import RecordingsTable from "./recordings"

type UserData = components["schemas"]["User"]

export default function Dashboard({session}: {session: Session | null}) {
const [data, setData] = useState<UserData|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) {
        setError("No access token")
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/me/`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })

        if (!res.ok) {
          setError(`Error: ${res.status}`)
          setLoading(false)
          return
        }

        const result = await res.json()
        setData(result)
      } catch (err) {
        console.log(err)
        setError("Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [session])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!data) return null

  const filteredPracticeItems = (selectedActivity === "" && selectedTag === "") 
    ? data.practice_items 
    : (selectedActivity !== "" && selectedTag !== "") 
    ? data.practice_items.filter(i => i.activity === selectedActivity && i.tags!.includes(selectedTag))
    : selectedActivity !== ""
    ? data.practice_items.filter(i => i.activity === selectedActivity)
    : data.practice_items.filter(i => i.tags!.includes(selectedTag))


  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row justify-between items-center p-4 font-medium">
          <h1>Practice Overview{selectedActivity !== "" && ` - ${selectedActivity}`}</h1>
        <AddPracticeBtn />
      </div>
      <div>
      <ActivityFilter selectedActivity={selectedActivity} setSelectedActivity={(a) => setSelectedActivity(a)} activities={data.practice_items.map((i) => i.activity)} />
      <TagFilter selectedTag={selectedTag} setSelectedTag={(tag) => setSelectedTag(tag)}   tags={data.practice_items.map(i => i.tags).flat().filter((t): t is string => typeof t === "string")}
      />
      </div>
      <DaySelect diaryEntries={data.diary_entries} recordings={data.recordings} dailyTarget={data.daily_target} selectedActivity={selectedActivity} practiceItems={filteredPracticeItems}/>
      
      <HeatMap selectedActivity={selectedActivity} practiceItems={filteredPracticeItems} />
      <StreakIndex practiceItems={filteredPracticeItems}/>
      <RecordingsTable recordings={data.recordings} />   
     </div>
  )
}