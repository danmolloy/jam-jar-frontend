import { auth } from '@/auth';
import CreateDiaryEntry from '@/components/diaryEntries/create';

export default async function CreateDiaryEntryPage() {
  const session = await auth();
  return <CreateDiaryEntry mode="create" session={session!} />;
}
