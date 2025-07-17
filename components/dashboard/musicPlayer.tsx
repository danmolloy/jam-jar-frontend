import { components } from "@/types/api";
import { useRef } from "react"

type Recording = components["schemas"]["AudioRecording"]

export default function MusicPlayer({recording}: {
  recording: Recording
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  

  return (
    <div className="flex items-center justify-center p-2">
      <audio 
      ref={audioRef}
      src={recording.url}
      controls
      />

    </div>
  )
}