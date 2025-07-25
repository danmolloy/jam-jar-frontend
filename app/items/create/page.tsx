import { auth } from "@/auth";
import CreateSession from "@/components/practice/create";

export default async function CreateSessionPage() {
      const session = await auth()
  return (
    <CreateSession mode="create" session={session!}/>
  )
}