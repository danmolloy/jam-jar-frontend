'use client';
import DonutMD from '@/components/dashboard/donutMD';
import { DateTime } from 'luxon';

export default function TargetComponent() {
  return (
    <div className="flex flex-row  items-center justify-center md:items-start  my-4">
      <DonutMD
        preview={true}
        day={DateTime.now().minus({ days: 2 })}
        selectedDay={DateTime.now()}
        setSelectedDay={() => {}}
        progressPercent={80}
        dayRecordings={[]}
      />

      <DonutMD
        preview={true}
        day={DateTime.now().minus({ days: 1 })}
        selectedDay={DateTime.now()}
        setSelectedDay={() => {}}
        progressPercent={65}
        dayRecordings={[]}
      />
      <DonutMD
        preview={true}
        day={DateTime.now()}
        selectedDay={DateTime.now()}
        setSelectedDay={() => {}}
        progressPercent={100}
        dayRecordings={[]}
      />
    </div>
  );
}
