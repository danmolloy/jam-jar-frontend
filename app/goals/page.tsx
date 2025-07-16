import { auth } from "@/auth";
import GoalsList from "@/components/goals/listView";
import Login from "@/components/shared/login";

export default async function GoalsPage() {
  const session = await auth()
    
    if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
      return <Login />
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/goals/`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`
      }
    })
  
    const data =  await res.json();
  
    if (!data) {
      return <p>Loading..</p>
    }
  
  
    return (
      <div>
        <h1>Goals</h1>
        <GoalsList goals={data} />
      </div>
    )
}