'use client'
import { DateTime } from 'luxon';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeekBarChart({data, selectedWeek, selectedActivity}: {
  data: {
    day: string
    minutes: number
  }[]
  selectedActivity: string
  selectedWeek: DateTime
}) {
  return (
  <div className={"shadow rounded p-2 bg-white m-4"}>
    <div className='p-2'>
      <h2>Week {selectedWeek.startOf('week').toFormat('dd LLLL yyyy')} Overview{selectedActivity !== "" && ` - ${selectedActivity}`}</h2>
    </div>
  <ResponsiveContainer width="100%" height={320} className={"font-mono text-sm"}>
    <BarChart data={data} >
      <XAxis dataKey="day" stroke='black' strokeWidth={1}/>
      <YAxis stroke="black" strokeWidth={1} /* label={{ value: 'Mins', angle: -90, position: 'insideLeft', }} */ />
      <Tooltip />
      <Bar onClick={(e) => alert(JSON.stringify(e))} dataKey="minutes"   fill="#2b7fff" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
  </div>
  )
};