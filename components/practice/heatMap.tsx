'use client'
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { PracticeItem } from "./detailView";


export default function HeatMap({practiceItems, selectedActivity}: {
  selectedActivity: string;
  practiceItems: PracticeItem[]
}) {
  const [selectedDate, setSelectedDate] = useState<DateTime|null>(null)
  const heatmapRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (heatmapRef.current) {
    // Wait until layout is rendered
    requestAnimationFrame(() => {
      heatmapRef.current!.scrollLeft = heatmapRef.current!.scrollWidth;
    });
  }
}, []);


  return (
    <div className="shadow m-4 rounded p-4 flex flex-col bg-white">
  <h2>Activity{selectedActivity && ` - ${selectedActivity}`}</h2>

  {/* Horizontal scroll wrapper */}
  <div ref={heatmapRef} className="overflow-x-auto w-full">
    <div className="flex flex-row items-start gap-[2px] min-w-max">
      {
        // group dates into columns (weeks)
        Array.from({ length: 53 }).map((_, weekIndex) => {
          // each week column contains 7 day "boxes"
          return (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((__, dayIndex) => {
                const day = DateTime.now()
                  .startOf('week')
                  .minus({ weeks: 52 - weekIndex }) // go back in time
                  .plus({ days: dayIndex });

                const isActive = practiceItems.filter((j) =>
                  DateTime.fromISO(j.date).hasSame(day, "day")
                );
                const isSelected = selectedDate?.hasSame(day, "day");

                const getColorClass = (count: number) => {
                  if (count > 9) return "bg-blue-900";
                  if (count >= 7) return "bg-blue-800";
                  if (count >= 5) return "bg-blue-600";
                  if (count >= 3) return "bg-blue-500";
                  if (count >= 2) return "bg-blue-400";
                  if (count > 0) return "bg-blue-300";
                  return "bg-slate-200";
                };

                return (
                  <button
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={() => setSelectedDate(day)}
                    className={`w-[10px] h-[10px] rounded-sm hover:cursor-pointer ${
                      isSelected ? "bg-green-400" : getColorClass(isActive.length)
                    }`}
                    title={`${day.toFormat("ccc dd LLL")}: ${isActive.length} activities`}
                  />
                );
              })}
            </div>
          );
        })
      }
    </div>
  </div>

  {/* Detail viewer */}
  {selectedDate && (
    <div className="mt-2">
      <p>{selectedDate.toFormat("dd LLLL yyyy")}</p>
      {
        practiceItems.filter((i) =>
          DateTime.fromISO(i.date).hasSame(selectedDate, "day")
        ).length > 0 ? (
          practiceItems
            .filter((i) =>
              DateTime.fromISO(i.date).hasSame(selectedDate, "day")
            )
            .map((i) => (
              <div key={i.id}>
                <p>{i.activity} ({i.duration} mins)</p>
              </div>
            ))
        ) : (
          <p>No practice logged</p>
        )
      }
    </div>
  )}
</div>
  );
}