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
import Link from "next/link"
import AllEntries from "./allEntries"

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
    <div className="flex flex-col p-4 bg-neutral-100">
      {data.subscription_status !== "active" && <div className="text-center bg-black text-white font-medium -mt-4 ">
        <Link href="/account" className="hover:underline">Unlock your potential with our premium subscription.</Link>
      </div>}
      <div className="flex flex-row justify-between items-center p-2 font-medium">
          <h1>Practice Overview{selectedActivity !== "" && ` - ${selectedActivity}`}{selectedTag !== "" && ` #${selectedTag}`}</h1>
        <AddPracticeBtn subscriptionStatus={data.subscription_status}/>
      </div>
      <div className="m-2">
      <ActivityFilter selectedActivity={selectedActivity} setSelectedActivity={(a) => setSelectedActivity(a)} activities={data.practice_items.map((i) => i.activity)} />
      <TagFilter selectedTag={selectedTag} setSelectedTag={(tag) => setSelectedTag(tag)}   tags={data.practice_items.map(i => i.tags).flat().filter((t): t is string => typeof t === "string")}
      />
      </div>
      <div className="relative flex flex-col">
               
      { (selectedActivity !== "" || selectedTag !== "") && data.subscription_status !== "active" 
      &&  <div className={`z-10 absolute flex flex-col items-center  backdrop-blur-xs right-4 left-4 top-4 bottom-4`}>
        <div className="text-center mt-24 mx-8 shadow bg-white border max-w-[300px] ">
          <p className="font-bold text-xl">Filters are available for Premium users only.</p>
          <Link href="/account" className="my-4 hover:underline text-blue-500">Get Premium</Link>
        </div>
        </div>}
      
      <DaySelect selectedTag={selectedTag} diaryEntries={data.diary_entries} recordings={data.recordings} dailyTarget={data.daily_target} selectedActivity={selectedActivity} practiceItems={filteredPracticeItems}/>
      <div className="flex flex-col lg:flex-row justify-between">

      <HeatMap selectedTag={selectedTag} selectedActivity={selectedActivity} practiceItems={filteredPracticeItems} />
      <StreakIndex selectedTag={selectedTag} selectedActivity={selectedActivity} practiceItems={filteredPracticeItems}/>
      </div>
     </div>
     <div className="flex flex-col lg:flex-row w-full justify-between ">

      <RecordingsTable recordings={data.recordings} />  
      <AllEntries entries={data.diary_entries} /> 
     </div>
     </div>
  )
}