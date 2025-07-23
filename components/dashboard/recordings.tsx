import { components } from "@/types/api"
import { DateTime } from "luxon"
import MusicPlayer from "./musicPlayer"
import { useState } from "react"

type Recording = components['schemas']['AudioRecording']

export default function RecordingsTable({recordings}: {
  recordings: Recording[]
}) {
  const [selectedRecording, setSelectedRecording] = useState<number|null>(null);

  return (
    <div className=" rounded p-4  shadow m-2 bg-white">
      <h2>All Recordings</h2>
      <div className="border-t border-gray-300">
        {recordings.length === 0 
        ? <p>No recordings</p> 
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