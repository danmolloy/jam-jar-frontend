import { auth } from "@/auth"
import AchievementsList from "@/components/achievements/listView"


export default async function AchievementPage() {
const session = await auth()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/achievements/`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  })

  const data =  await res.json();

  if (!data) {
    return <p>Loading..</p>
  }


  return (
    <AchievementsList achievements={data}/>
  )
}