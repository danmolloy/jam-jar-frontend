'use client';
import { DateTime } from 'luxon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeekBarChart({
  data,
  selectedWeek,
  selectedActivity,
  selectedTag,
}: {
  data: {
    day: string;
    minutes: number;
  }[];
  selectedActivity: string;
  selectedTag: string;
  selectedWeek: DateTime;
}) {
  return (
    <div className={'shadow rounded p-2 bg-white m-2 lg:w-1/2'}>
      <div className="p-2">
        <h2 className="text-base">
          WEEK {selectedWeek.startOf('week').toFormat('dd LLLL yyyy').toUpperCase()}
          <span className="font-medium">
            {selectedActivity !== '' && ` - ${selectedActivity}`}
            {selectedTag !== '' && ` #${selectedTag}`}
          </span>
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={320} className={'font-mono text-sm'}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="black" strokeWidth={1} />
          <YAxis
            stroke="black"
            strokeWidth={1}
            label={{ value: 'mins', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar
            onClick={() => {}}
            dataKey="minutes"
            fill="oklch(88.2% 0.059 254.128)"
            stroke="oklch(54.6% 0.245 262.881)"
            strokeWidth={2}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
