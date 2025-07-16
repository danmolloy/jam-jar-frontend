import { components } from "@/types/api";
import { useRef, useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa6";

type Recording = components["schemas"]["AudioRecording"]

export default function MusicPlayer({recording}: {
  recording: Recording
}) {
  const [isPlaying, setIsPlaying] = useState(false);
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