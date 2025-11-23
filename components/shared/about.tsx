import { BiTargetLock } from 'react-icons/bi';
import { RiRecordMailLine } from 'react-icons/ri';
import { IoIosJournal } from 'react-icons/io';
import { FaHashtag } from 'react-icons/fa6';
import { CiBoxList } from 'react-icons/ci';
import About from './about/index';
import { DateTime } from 'luxon';
import TargetComponent from './about/targetComponent';
import DiaryComponent from './about/diaryComponent';
import AudioPreview from './about/audioPreview';
import TagsPreview from './about/tagsPreview';
import LogPreview from './about/logPreview';
import HeatmapPreview from './about/heatmapPreview';
import { FcHeatMap } from 'react-icons/fc';

export const featuresArr: {
  title: string;
  body: string;
  icon: React.ReactNode;
  component?: React.ReactNode;
}[] = [
  {
    title: 'Practice Logging',
    body: 'Keep a record of what you practiced, for how long and when. You can add notes and hashtags to your session.',
    icon: <CiBoxList />,
    component: <LogPreview />,
  },
  {
    title: 'Daily Targets',
    body: "Set a target duration to practice each day. At a quick glance, you can see how you've done across the week.",
    icon: <BiTargetLock />,
    component: <TargetComponent />,
  },
  {
    title: 'Journaling',
    body: "Write about anything - what you're aiming towards, lesson notes or just some thoughts you've had that day.",
    icon: <IoIosJournal />,
    component: <DiaryComponent />,
  },
  {
    title: 'Audio Recording',
    body: 'Record your practice and listen back to how your playing has developed over time.',
    icon: <RiRecordMailLine />,
    component: (
      <AudioPreview
        recordings={[
          {
            id: '1',
            title: 'Franck Sonata',
            location: 'Maida Vale',
            notes: 'Take 3',
            tags: [],
            date: String(DateTime.now().toISO()),
          },
        ]}
      />
    ),
  },

  {
    title: 'Year Heat Map',
    body: 'Spot macro trends in your practice with a heat map data display.',
    icon: <FcHeatMap />,
    component: <HeatmapPreview />,
  },
  {
    title: 'Tags and Advanced Filtering',
    body: 'Sort and filter your data by activity or hashtag to see what you’re putting time into.',
    icon: <FaHashtag />,
    component: <TagsPreview />,
  },
];

export default function AboutIndex() {
  return (
    <div>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center text-white rounded-t-full bg-dark">
        <div className="flex flex-col items-center justify-center lg:w-1/2 p-4 text-center">
          <h1 className="font-mono text-xl font-normal text-amber-50">Practice makes perfect.</h1>
          {/* <p className="mt-4">
            But progress doesn&apos;t happen overnight. Progress happens over days, weeks and years
            in small, consistent steps and with constant reflection of the decisions you take.
            Practice is about the journey taken.
          </p> */}
        </div>
      </div>
      <About />
      {/* <div
        id="about"
        className="bg-gray-100  flex flex-col pb-4 min-h-screen items-center justify-center"
      >
        <h1 className="font-serif md:text-7xl text-6xl m-4">Capture your practice</h1>

        <div className="m-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {featuresArr.map((i, index) => (
            <div
              key={index}
              className={` border rounded-xl bg-white p-6 flex flex-col
          ${index === 0 ? 'md:col-span-2' : ''}
          ${index === featuresArr.length - 1 ? 'md:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl text-blue-700">{i.icon}</div>
                <h2 className="text-2xl font-semibold">{i.title}</h2>
              </div>
              <p className="text-lg">{i.body}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
