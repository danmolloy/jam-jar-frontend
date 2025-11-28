'use client';
import { Session } from 'next-auth';
import HeatMap from '../practice/heatMap';
import DaySelect from './daySelect';
import StreakIndex from './streak';
import AddPracticeBtn from './addPracticeBtn';
import { useEffect, useState } from 'react';
import ActivityFilter from './activityFilter';
import { components } from '@/types/api';
import TagFilter from './tagFilter';
import RecordingsTable from './recordings';
import Link from 'next/link';
import AllEntries from './allEntries';
import { DateTime } from 'luxon';
import Loading from '@/app/loading';

type UserData = components['schemas']['User'];

export default function Dashboard({ session }: { session: Session | null }) {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<DateTime>(DateTime.now().startOf('day'));
  const [selectedWeek, setSelectedWeek] = useState(DateTime.now().startOf('week'));

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) {
        setError('No access token');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/me/`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) {
          setError(`Error: ${res.status}`);
          setLoading(false);
          return;
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  const filteredPracticeItems =
    selectedActivity === '' && selectedTag === ''
      ? data.practice_items
      : selectedActivity !== '' && selectedTag !== ''
        ? data.practice_items.filter(
            (i) => i.activity === selectedActivity && i.tags!.includes(selectedTag),
          )
        : selectedActivity !== ''
          ? data.practice_items.filter((i) => i.activity === selectedActivity)
          : data.practice_items.filter((i) => i.tags!.includes(selectedTag));

  return (
    <div className="flex flex-col p-4 bg-zinc-100">
      {data.subscription_status !== 'active' && (
        <div className="text-center bg-white text-blue-600 font-medium mb-4 p-4 ">
          <Link href="/account" className="hover:underline">
            Unlock your potential with our premium subscription.
          </Link>
        </div>
      )}
      <div className="flex flex-row justify-between items-center p-2 font-medium">
        <h1>
          Practice Overview{selectedActivity !== '' && ` - ${selectedActivity}`}
          {selectedTag !== '' && ` #${selectedTag}`}
        </h1>
        <AddPracticeBtn subscriptionStatus={data.subscription_status} />
      </div>
      <div className="m-2">
        <ActivityFilter
          selectedActivity={selectedActivity}
          setSelectedActivity={(a) => setSelectedActivity(a)}
          activities={data.practice_items.map((i) => i.activity)}
        />
        <TagFilter
          selectedTag={selectedTag}
          setSelectedTag={(tag) => setSelectedTag(tag)}
          tags={data.practice_items
            .map((i) => i.tags)
            .flat()
            .filter((t): t is string => typeof t === 'string')}
        />
      </div>
      <div className="relative flex flex-col">
        {(selectedActivity !== '' || selectedTag !== '') &&
          data.subscription_status !== 'active' && (
            <div className="backdrop-blur-xs absolute flex flex-col items-start justify-start w-full h-full z-10">
              <div className="bg-white self-center mt-12 p-4 shadow text-center">
                <h2 className="font-bold">Filters are available for premium users only.</h2>
                <Link href="/account" className="hover:underline text-blue-600 ">
                  Upgrade now
                </Link>
              </div>
            </div>
          )}

        <DaySelect
          selectedDay={selectedDay}
          setSelectedDay={(day) => setSelectedDay(day)}
          selectedWeek={selectedWeek}
          setSelectedWeek={(week) => setSelectedWeek(week)}
          selectedTag={selectedTag}
          diaryEntries={data.diary_entries}
          recordings={data.recordings}
          dailyTarget={data.daily_target}
          selectedActivity={selectedActivity}
          practiceItems={filteredPracticeItems}
        />
        <div className="flex flex-col lg:flex-row justify-between">
          <HeatMap
            selectedDate={selectedDay}
            setSelectedDate={(day) => {
              setSelectedDay(day);
              setSelectedWeek(day.startOf('week'));
            }}
            selectedTag={selectedTag}
            selectedActivity={selectedActivity}
            practiceItems={filteredPracticeItems}
          />
          <StreakIndex
            selectedTag={selectedTag}
            selectedActivity={selectedActivity}
            practiceItems={filteredPracticeItems}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between ">
        <RecordingsTable
          isPremium={data.subscription_status === 'active' ? true : false}
          recordings={data.recordings}
        />
        <AllEntries entries={data.diary_entries} />
      </div>
    </div>
  );
}
