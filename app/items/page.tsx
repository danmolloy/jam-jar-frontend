import { auth } from "@/auth"
import SessionList from "@/components/practice/listView";
import Login from "@/components/shared/login";

export default async function SessionsPage() {
  const session = await auth()
  
  if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
    return <Login />
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/practice-items/`, {
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
      <h1>Practice Activity</h1>
      <SessionList items={data} />
    </div>
  )
}