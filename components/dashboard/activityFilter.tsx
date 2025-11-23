export type Activity = string | undefined;

export type ActivityFilterProps = {
  activities: Activity[];
  selectedActivity: string;
  setSelectedActivity: (arg: string) => void;
};

export default function ActivityFilter({
  activities,
  selectedActivity,
  setSelectedActivity,
}: ActivityFilterProps) {
  const activitiesSet = new Set(
    activities.map((i) => i !== undefined && i[0].toUpperCase() + i.slice(1).toLowerCase()),
  );

  return (
    <select
      data-testid="activity-filter"
      className=" rounded p-1 mx-1 bg-white "
      value={selectedActivity}
      onChange={(e) => setSelectedActivity(e.target.value)}
    >
      <option value={''}>All activities</option>
      {Array.from(activitiesSet).map((i, index) => (
        <option key={index} value={i || ''}>
          {i}
        </option>
      ))}
    </select>
  );
}
