'use client';
import { DateTime } from 'luxon';
import { PracticeItem } from '../practice/detailView';
import { FaAngleLeft, FaAngleRight, FaRegCalendar } from 'react-icons/fa';
import WeekBarChart from './barChart';
import { components } from '@/types/api';
import DiaryEntry from './diaryEntry';
import { MdEdit } from 'react-icons/md';
import Link from 'next/link';
import { motion } from 'framer-motion'

export type Recording = components['schemas']['AudioRecording'];
type DiaryEntry = components['schemas']['DiaryEntry'];

export default function DaySelect({
  practiceItems,
  selectedTag,
  selectedActivity,
  dailyTarget = 0,
  recordings,
  diaryEntries,
  selectedDay,
  setSelectedDay,
  selectedWeek,
  setSelectedWeek,
}: {
  recordings: Recording[];
  practiceItems: PracticeItem[];
  selectedActivity: string;
  selectedTag: string;
  dailyTarget: number | undefined;
  diaryEntries: DiaryEntry[];
  selectedDay: DateTime;
  setSelectedDay: (arg: DateTime) => void;
  selectedWeek: DateTime;
  setSelectedWeek: (arg: DateTime) => void;
}) {
  const getWeekArray = (): DateTime[] => {
    const arr = new Array(7).fill(null);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = selectedWeek.plus({ days: i });
    }
    return arr;
  };

  const getDay = (ind: number) => {
    return selectedWeek.plus({ days: ind });
  }

  const weekData = getWeekArray().map((day) => {
    const totalMinutes = practiceItems
      .filter((item) => DateTime.fromISO(item.date).hasSame(day, 'day'))
      .reduce((sum, item) => sum + item.duration!, 0);

    return {
      day: day.toFormat('ccc'), // e.g. "Mon", "Tue"
      minutes: totalMinutes,
    };
  });

  const dayRecordings = (day: DateTime) =>
    recordings.filter((i) => DateTime.fromISO(i.date).hasSame(day, 'day'));

  const dayDiaryEntries = (day: DateTime) =>
    diaryEntries.filter((i) => DateTime.fromISO(i.date).hasSame(day, 'day'));

  const totalItemsForDay = (day: DateTime) =>
    practiceItems
      .filter((j) => DateTime.fromISO(j.date).hasSame(day, 'day') && typeof j.duration === 'number')
      .reduce((sum, j) => sum + j.duration!, 0);

  const progressPercent = (day: DateTime) =>
    Math.min((totalItemsForDay(day) / dailyTarget) * 100, 100);

  return (
    <div className="flex flex-col lg:flex-row ">
      <div
       className="flex flex-col  shadow m-2 rounded p-4 bg-white lg:max-w-[60%] ">
        <div className="flex flex-row justify-evenly">
          <button
            className="text-black hover:text-slate-400 hover:cursor-pointer"
            onClick={() => {
              setSelectedDay(selectedDay.startOf('week').minus({ weeks: 1 }));
              setSelectedWeek(selectedWeek.minus({ weeks: 1 }));
            }}
          >
            <FaAngleLeft size={24} />
          </button>
          <button
            className=" hover:text-slate-400 hover:cursor-pointer"
            onClick={() => {
              setSelectedDay(DateTime.now().startOf('day'));
              setSelectedWeek(DateTime.now().startOf('week'));
            }}
          >
            <FaRegCalendar size={24} />
          </button>
          <button
            className="text-black hover:text-slate-400 hover:cursor-pointer"
            onClick={() => {
              setSelectedDay(selectedDay.startOf('week').plus({ weeks: 1 }));
              setSelectedWeek(selectedWeek.plus({ weeks: 1 }));
            }}
          >
            <FaAngleRight size={24} />
          </button>
        </div>
        {/* sm */}
        <p className="text-xs m-2 mt-4 self-center ">DAILY TARGET: {dailyTarget} mins</p>
        <div className="md:hidden flex flex-row justify-evenly ">
          {getWeekArray().map((i) => (
            <div key={i.toISO()} className="relative flex flex-col items-center justify-center">
              <button
                onClick={() => setSelectedDay(i)}
                disabled={i > DateTime.now()}
                className={`hover:bg-neutral-50 rounded text-sm p-1 flex flex-col items-center justify-center hover:cursor-pointer
          ${selectedDay.hasSame(i, 'day') ? 'text-blue-500 font-medium' : ''}`}
              >
                <p>{i.toFormat('ccccc')}</p>
                <div className="h-2 w-2 flex items-center justify-center">
                  {dayRecordings(i).length > 0 && <p>•</p>}
                </div>
                {/* SVG Donut Progress */}
                <svg className="w-6 h-6 mt-1 -rotate-90" viewBox="0 0 20 20">
                  <circle
                    className="text-slate-200"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="transparent"
                    r="9"
                    cx="10"
                    cy="10"
                  />
                  <motion.circle
                  
                    className="text-green-400 "
                    strokeWidth="2"
                    strokeDasharray="56.5"
                    initial={{strokeDashoffset:56.5}}
                  animate={{
                    strokeDashoffset: 56.5 - (56.5 * progressPercent(i)) / 100
                  }}
                  transition={{
                    type: 'spring', stiffness: 120, damping: 20 
                  }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="9"
                    cx="10"
                    cy="10"
                  />
                </svg>{' '}
              </button>
            </div>
          ))}
        </div>
        {/* md */}
        <div className="hidden md:flex flex-row justify-evenly ">
          {new Array(7).fill(null).map((_, ind) => (
            <div key={ind} className="relative w-20 h-20 m-2">
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
                key={ind}
                  className={'text-green-400'}
                  strokeWidth="8"
                  strokeDasharray="226.2" // 2πr where r=36
                  initial={{strokeDashoffset:226.2}}
                  animate={{
                    strokeDashoffset:226.2 - (226.2 * progressPercent(getDay(ind))) / 100,
                  }}
                  transition={{
                    type: 'spring', stiffness: 120, damping: 20 
                  }}
                  
                  
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="36"
                  cx="40"
                  cy="40"
                />
              </svg>

              <button
                onClick={() => setSelectedDay(getDay(ind))}
                disabled={getDay(ind) > DateTime.now()}
                className={`absolute hidden hover:text-blue-500 disabled:text-slate-500 disabled:cursor-auto top-0 left-0 w-full h-full rounded-full text-sm shadow p-2 md:flex flex-col items-center justify-center hover:cursor-pointer 
      ${selectedDay.hasSame(getDay(ind), 'day') ? ' text-blue-500 font-medium' : ''}`}
              >
                <p>{getDay(ind).toFormat('ccc')}</p>
                <p>{getDay(ind).toFormat('dd')}</p>
                <div className="h-2 w-2 flex flex-col items-center justify-center">
                  {dayRecordings(getDay(ind)).length > 0 && <p>•</p>}
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="">
          <h2 className="font-base text-base py-2">
            {selectedDay.toFormat('cccc dd LLL').toUpperCase()}
            <span className="font-medium">
              {selectedActivity && ` - ${selectedActivity}`}
              {selectedTag && ` #${selectedTag}`}
            </span>
          </h2>
          <div className="">
            <h3 className="text-base font-bold">Practice</h3>
            {practiceItems.filter((j) => DateTime.fromISO(j.date).hasSame(selectedDay, 'day'))
              .length > 0 ? (
              practiceItems
                .filter((j) => DateTime.fromISO(j.date).hasSame(selectedDay, 'day'))
                .map((i, index) => (
                  <div
                    key={i.id}
                    className={` w-full flex flex-col justify-between items-center ${index % 2 === 1 && 'bg-slate-50'}`}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <p>
                        {i.activity} ({i.duration} mins)
                      </p>
                      <div className="flex flex-row items-start">
                        <Link href={`/items/${i.id}/update/`} className="text-black px-1 mx-1">
                          <MdEdit size={20} />
                        </Link>
                      </div>
                    </div>
                    <p className="text-sm ml-2">{i.notes}</p>
                  </div>
                ))
            ) : (
              <p className="text-neutral-400">No practice on this day</p>
            )}
          </div>

          <div className="  mt-2">
            <h3 className="font-bold">Recordings</h3>
            <div className="">
              {recordings.filter((j) => DateTime.fromISO(j.date).hasSame(selectedDay, 'day'))
                .length > 0 ? (
                recordings
                  .filter((j) => DateTime.fromISO(j.date).hasSame(selectedDay, 'day'))
                  .map((j) => (
                    <div key={j.id}>
                      <p className="font-medium text-base text-start">{j.title}</p>
                      <div className="flex flex-row justify-between items-center ">
                        <p>{j.location}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-neutral-400">No recordings </p>
              )}
            </div>
          </div>
          <div>
            <div className=" mt-2">
              <h3 className="font-bold">Diary</h3>
              {dayDiaryEntries(selectedDay).length < 1 ? (
                <p className="text-neutral-400">No entries</p>
              ) : (
                dayDiaryEntries(selectedDay).map((entry) => (
                  <DiaryEntry key={entry.id} diaryEntry={entry} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <WeekBarChart
        selectedTag={selectedTag}
        selectedActivity={selectedActivity}
        data={weekData}
        selectedWeek={selectedWeek}
      />
    </div>
  );
}
