import { DateTime } from 'luxon';
import { Recording } from './daySelect';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export type DonutMdProps = {
  day: DateTime;
  selectedDay: DateTime;
  setSelectedDay: (arg: DateTime) => void;
  progressPercent: number;
  dayRecordings: Recording[];
  preview: boolean;
};

export default function DonutMD(props: DonutMdProps) {
  const { day, selectedDay, setSelectedDay, progressPercent, dayRecordings, preview } = props;
  const circleRef = useRef<SVGCircleElement | null>(null);
  const isInView = useInView(circleRef, { once: true, amount: 0.6 });
  const dashArray = 226.2; // 2πr where r=36
  const targetOffset = dashArray - (dashArray * progressPercent) / 100;

  return (
    <div key={day.toISO()} className="relative w-20 h-20 m-2">
      <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 ">
        <circle
          className="text-slate-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="36"
          cx="40"
          cy="40"
        />
        <motion.circle
          ref={circleRef}
          initial={{ strokeDashoffset: dashArray }}
          animate={{ strokeDashoffset: isInView ? targetOffset : dashArray }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: .75 }}
          className="text-green-400 transition-all duration-500 ease-out"
          strokeWidth="8"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="36"
          cx="40"
          cy="40"
        />
      </svg>

      <button
        onClick={() => setSelectedDay(day)}
        disabled={day > DateTime.now()}
        className={`absolute hover:text-blue-500 disabled:text-slate-500 disabled:cursor-auto top-0 left-0 w-full h-full rounded-full text-sm shadow p-2 ${preview ? 'flex' : 'hidden md:flex'} flex-col items-center justify-center hover:cursor-pointer 
          ${selectedDay.hasSame(day, 'day') ? ' text-blue-500 font-medium' : ''}`}
      >
        <p>{day.toFormat('ccc')}</p>
        <p>{day.toFormat('dd')}</p>
        <div className="h-2 w-2 flex flex-col items-center justify-center">
          {dayRecordings.length > 0 && <p>•</p>}
        </div>
      </button>
    </div>
  );
}
