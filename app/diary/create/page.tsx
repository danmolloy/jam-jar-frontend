import { auth } from '@/auth';
import CreateDiaryEntry from '@/components/diaryEntries/create';

export default async function CreateDiaryEntryPage() {
  const session = await auth();
  return (
        <div className='w-full p-2 h-full flex flex-col items-center justify-center'>

  <CreateDiaryEntry mode="create" session={session!} /></div>);
}
