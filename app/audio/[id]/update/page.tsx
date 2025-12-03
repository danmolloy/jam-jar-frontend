import { auth } from '@/auth';
import AudioForm from '@/components/audio/form';
import { components } from '@/types/api';

type Recording = components['schemas']['AudioRecording'];

export default async function AudioUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/${id}/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to load session');
  }

  const data: Recording = await res.json();

  return (
    <div className="w-full p-2 h-full flex flex-col items-center justify-center">
      <AudioForm mode={'update'} audioRecording={data} />
    </div>
  );
}
