'use client';
import { DateTime } from 'luxon';
import { useEffect, useRef, useMemo } from 'react';
import { PracticeItem } from './detailView';

export default function HeatMap({
  practiceItems,
  selectedActivity,
  selectedTag,
  selectedDate,
  setSelectedDate,
}: {
  selectedActivity: string;
  practiceItems: PracticeItem[];
  selectedTag: string;
  selectedDate: DateTime;
  setSelectedDate: (arg: DateTime) => void;
}) {
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heatmapRef.current) {
      requestAnimationFrame(() => {
        heatmapRef.current!.scrollLeft = heatmapRef.current!.scrollWidth;
      });
    }
  }, []);

  const totalsByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of practiceItems) {
      const dateKey = DateTime.fromISO(item.date).toISODate() || '';
      map[dateKey] = (map[dateKey] || 0) + (item.duration || 0);
    }
    return map;
  }, [practiceItems]);

  const thresholds = useMemo(() => {
    const totals = Object.values(totalsByDate)
      .filter((v) => v > 0)
      .sort((a, b) => a - b);
    if (totals.length === 0) return [];

    const getPercentile = (p: number) => {
      const idx = (p / 100) * (totals.length - 1);
      const lower = Math.floor(idx);
      const upper = Math.ceil(idx);
      if (lower === upper) return totals[lower];
      return totals[lower] + (totals[upper] - totals[lower]) * (idx - lower);
    };

    return [
      getPercentile(16.6),
      getPercentile(33.3),
      getPercentile(50),
      getPercentile(66.6),
      getPercentile(83.3),
    ];
  }, [totalsByDate]);

  // 3️⃣ Function to pick color based on percentile
  const getColorClass = (mins: number) => {
    if (mins === 0) return 'bg-slate-200';
    if (mins > thresholds[4]) return 'bg-blue-900';
    if (mins > thresholds[3]) return 'bg-blue-800';
    if (mins > thresholds[2]) return 'bg-blue-600';
    if (mins > thresholds[1]) return 'bg-blue-500';
    if (mins > thresholds[0]) return 'bg-blue-400';
    return 'bg-blue-300';
  };

  return (
    <div className="shadow m-2 rounded p-4 flex flex-col bg-white">
      <h2 className="text-base mb-2">
        ACTIVITY
        <span className="font-medium">
          {selectedActivity && ` - ${selectedActivity}`}
          {selectedTag && ` #${selectedTag}`}
        </span>
      </h2>

      {/* Heatmap */}
      <div ref={heatmapRef} className="overflow-x-auto w-full ">
        <div className="flex flex-row items-start gap-[2px] min-w-max mr-2 ">
          {Array.from({ length: 53 }).map((_, weekIndex) => (
            <div key={weekIndex} className="relative flex flex-col gap-[2px] mt-5 ">
              {(() => {
                const weekStart = DateTime.now()
                  .startOf('week')
                  .minus({ weeks: 52 - weekIndex });
                const prevWeekStart = weekStart.minus({ weeks: 1 });
                const monthStart = weekStart.startOf('month');

                const startsNewMonth = weekStart.month !== prevWeekStart.month;

                return (
                  startsNewMonth && (
                    <p className="text-xs absolute -mt-5">{monthStart.toFormat('LLL')}</p>
                  )
                );
              })()}
              {Array.from({ length: 7 }).map((__, dayIndex) => {
                const day = DateTime.now()
                  .startOf('week')
                  .minus({ weeks: 52 - weekIndex })
                  .plus({ days: dayIndex });

                const dateKey = day.toISODate();
                const totalMins = totalsByDate[dateKey] || 0;
                const isSelected = selectedDate.hasSame(day, 'day');

                return (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={
                      /* isSelected ? () => setSelectedDate(null) :  */ () => setSelectedDate(day)
                    }
                    className={`w-[10px] h-[10px]  hover:cursor-pointer 
                      ${day > DateTime.now() && 'hidden'}
                      ${isSelected ? 'bg-orange-600' : getColorClass(totalMins)}`}
                    title={`${day.toFormat('ccc dd LLL')}: ${totalMins} mins`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-row items-center justify-end text-sm text-gray-800 mt-1">
        <p>Less</p>
        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-slate-200 ml-1`} />

        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-blue-300 ml-0.5`} />
        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-blue-400 ml-0.5`} />
        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-blue-500 ml-0.5`} />
        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-blue-600 ml-0.5`} />
        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-blue-800 ml-0.5`} />

        <div className={`w-[10px] h-[10px]  hover:cursor-pointer bg-blue-900 mx-0.5 mr-1 `} />
        <p>More</p>
      </div>

      {/* Detail viewer */}
      {selectedDate && (
        <div className="mt-2">
          <p className="font-bold">{selectedDate.toFormat('dd LLLL yyyy')}</p>
          {practiceItems.filter((i) => DateTime.fromISO(i.date).hasSame(selectedDate, 'day'))
            .length > 0 ? (
            practiceItems
              .filter((i) => DateTime.fromISO(i.date).hasSame(selectedDate, 'day'))
              .map((i) => (
                <div key={i.id}>
                  <p>
                    {i.activity} ({i.duration} mins)
                  </p>
                </div>
              ))
          ) : (
            <p className="text-neutral-400">No practice logged</p>
          )}
        </div>
      )}
    </div>
  );
}
