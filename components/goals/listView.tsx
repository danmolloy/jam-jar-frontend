import { components } from "@/types/api"
import Link from "next/link"

type Goal = components["schemas"]["Goal"]

export default function GoalsList({
  goals
}: {
  goals: Goal[]
}) {

  

  return (
    <div>
      {goals.map(i => (
        <Link href={`/goals/${i.id}`} key={i.id}>
        {i.id}
        </Link>
      ))}
    </div>
  )
}