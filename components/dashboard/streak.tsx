import { DateTime } from "luxon";
import { PracticeItem } from "../practice/detailView"


export default function StreakIndex({practiceItems}: {
  practiceItems: PracticeItem[]
}) {

  const currentStreak = () => {
    const dateSet = new Set(practiceItems.map(i => DateTime.fromISO(i.date).toISODate())); 

    // It's still a streak if you haven't yet practiced today!
    let streak =dateSet.has(DateTime.now().toISODate()) ? 1 : 0;
    let date = DateTime.now().minus({ days: 1 });

    while (dateSet.has(date.toISODate())) {
    streak += 1;
    date = date.minus({ days: 1 });
  }

  return streak;
  };

  const longestStreak = () => {
  const dateSet = new Set(practiceItems.map(i => DateTime.fromISO(i.date).toISODate()));
  let maxStreak = 0;

  for (const isoDate of dateSet) {
    const date = DateTime.fromISO(isoDate!);

    // Only start counting if the previous day is NOT in the set
    const previousDay = date.minus({ days: 1 }).toISODate();
    if (!dateSet.has(previousDay)) {
      let streak = 1;
      let nextDay = date.plus({ days: 1 });

      // Count forward as long as consecutive dates exist
      while (dateSet.has(nextDay.toISODate())) {
        streak += 1;
        nextDay = nextDay.plus({ days: 1 });
      }

      maxStreak = Math.max(maxStreak, streak);
    }
  }

  return maxStreak;
};
  
  

  return (
    <div className="flex flex-col items-center justify-center shadow rounded bg-white p-4 m-4">
      <p className="text-2xl font-bold font-mono  ">{currentStreak()}</p>
      <p>Your current streak is {currentStreak()} days.</p>
      {currentStreak() < longestStreak() && longestStreak() > 0
      ? <p>Your longest streak is {longestStreak()} days.</p>
      : <p>This is your longest streak!</p>
     }
    </div>
  )
}