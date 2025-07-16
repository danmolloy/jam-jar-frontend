import LoginPage from "@/app/login/page";
import { auth } from "@/auth";
import CreateSession from "@/components/practice/create";

export default async function CreateSessionPage() {
      const session = await auth()
  
      if (!session) {
        return <LoginPage />
      }
  return (
    <CreateSession mode="create" session={session}/>
  )
}