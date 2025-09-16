import { components } from "@/types/api"
import { DateTime } from "luxon"
import MusicPlayer from "./musicPlayer"
import { useState } from "react"
import Link from "next/link"

type Recording = components['schemas']['AudioRecording']

export default function RecordingsTable({recordings, isPremium}: {
  recordings: Recording[]
  isPremium: boolean
}) {
  const [selectedRecording, setSelectedRecording] = useState<number|null>(null);

  return (
    <div className="lg:w-1/2 rounded p-4  shadow m-2 bg-white">
      <h2>ALL RECORDINGS</h2>
      <div className=" border-t border-gray-300">

        {!isPremium ? 
          <div className="bg-white self-center my-4 p-4  text-center">
          <h2 className="font-bold">Audio recording is available for premium users only.</h2>
                  <Link href="/account" className="hover:underline text-blue-600 ">Upgrade now</Link>
        </div>
        : recordings.length === 0 
        ? <div className="flex flex-col items-center justify-center px-2 py-4">
          <p className="font-semibold">No recordings.</p>
          <p>You haven&apos;t saved any recordings.</p>
          <Link className="text-blue-600 hover:underline" href="/audio/create/">Upload a recording</Link>
          </div>
        : recordings.map(i => (
          <div key={i.id} className="text-sm border-b border-gray-300 transition-all duration-700">
            <button onClick={() => setSelectedRecording(i.id)} className="p-1 w-full hover:cursor-pointer">

            <p className="font-medium text-base text-start">{i.title}</p>
            <div className="flex flex-row justify-between items-center ">
              <p>{DateTime.fromISO(i.date).toFormat('dd LLL yyyy')}</p>
              <p>{i.location}</p>
            </div>
            </button>
            {selectedRecording === i.id 
            && <div>
              <p>{i.notes}</p>
              <div>{i.tags?.map((j, index) => (
                <p key={index}>{j}</p>
              ))}
              </div>
              <MusicPlayer recording={i}/>

            </div>}
          </div>
        ))}
      </div>
    </div>
  )
}