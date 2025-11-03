import { auth } from '@/auth';
import CreateGoal from '@/components/goals/create';

export default async function CreateGoalPage() {
  const session = await auth();
  return <CreateGoal mode="create" session={session!} />;
}
