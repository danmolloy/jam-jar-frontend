'use client';
import { useInView } from 'framer-motion';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';

export default function HeatmapPreview() {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heatmapRef, { once: true });

  useEffect(() => {
    if (heatmapRef.current) {
      requestAnimationFrame(() => {
        heatmapRef.current!.scrollLeft = heatmapRef.current!.scrollWidth;
      });
    }
  }, []);

  const getColorClass = () => {
    const randInt = Math.random();
    if (randInt > 0.9) return 'bg-slate-200';
    if (randInt > 0.7) return 'bg-blue-900';
    if (randInt > 0.6) return 'bg-blue-800';
    if (randInt > 0.4) return 'bg-blue-600';
    if (randInt > 0.3) return 'bg-blue-500';
    if (randInt > 0.2) return 'bg-blue-400';
    return 'bg-blue-300';
  };

  return (
    <div className=" ">
      {/* Heatmap */}
      <div ref={heatmapRef} className="w-[80vw] lg:w-[40vw] m-2 overflow-x-scroll ">
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

                const isSelected = DateTime.now().hasSame(day, 'day');

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-[10px] h-[10px] hover:bg-orange-600  hover:cursor-pointer 
                            ${day > DateTime.now() && 'hidden'} transition-all duration-1000 delay-750
                            ${!isInView ? 'bg-slate-200' : isSelected ? 'bg-orange-600' : getColorClass()}`}
                    title={`${day.toFormat('ccc dd LLL')}: 0 mins`}
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
    </div>
  );
}
