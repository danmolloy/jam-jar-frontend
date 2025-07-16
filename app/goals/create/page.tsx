import LoginPage from "@/app/login/page";
import { auth } from "@/auth";
import CreateGoal from "@/components/goals/create";

export default async function CreateGoalPage() {
const session = await auth()
  
      if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
        return <LoginPage />
      }
  return (
    <CreateGoal mode="create" session={session}/>
  )
}