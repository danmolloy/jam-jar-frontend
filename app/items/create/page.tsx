import { auth } from '@/auth';
import CreateSession from '@/components/practice/create';

export default async function CreateSessionPage() {
  const session = await auth();
  return (
    <div className="w-full p-2 h-full flex flex-col items-center justify-center">
      <CreateSession mode="create" session={session!} />
    </div>
  );
}
