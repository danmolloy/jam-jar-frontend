import { components } from "@/types/api"

export type Achievement = string

export default function AchievementsList({achievements}: {
  achievements: Achievement[]
}) {

  
  return (
    <div className="flex flex-row p-4 my-4 border-2">
      <h2>Achievements</h2>
      <div>
        {achievements.map((i, index) => (
          <div key={index}>
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}