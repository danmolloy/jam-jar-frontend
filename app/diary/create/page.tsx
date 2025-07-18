import LoginPage from "@/app/login/page";
import { auth } from "@/auth";
import CreateDiaryEntry from "@/components/diaryEntries/create";
import CreateSession from "@/components/practice/create";

export default async function CreateDiaryEntryPage() {
      const session = await auth()
  
      if (!session) {
        return <LoginPage />
      }
  return (
    <CreateDiaryEntry mode="create" session={session}/>
  )
}