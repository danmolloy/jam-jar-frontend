
export type Activity = string|undefined;

export default function ActivityFilter({activities, selectedActivity, setSelectedActivity}: {
  activities: Activity[];
  selectedActivity: string;
  setSelectedActivity: (arg: string) => void
}) {

  const activitiesSet = new Set(activities.map(i => i !== undefined && i[0].toUpperCase() + i.slice(1).toLowerCase()))

  return (
    <select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
      <option value={""}>All activities</option>
      {Array.from(activitiesSet).map((i, index) => (
        <option key={index} value={i || ""}>{i}</option>
      ))}
    </select>
  )
}