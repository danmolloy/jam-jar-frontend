import { components } from '@/types/api';
import Link from 'next/link';
import { useRef } from 'react';
import { MdEdit } from 'react-icons/md';

type Recording = components['schemas']['AudioRecording'];

export default function MusicPlayer({ recording }: { recording: Recording }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex items-center justify-between p-2">
      <audio ref={audioRef} src={recording.url} controls />
      <Link href={`/audio/${recording.id}/update/`}>
        <MdEdit />
      </Link>
    </div>
  );
}
