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
    body: 'Keep a record of what you practiced, for how long and when - with optional notes and hashtags to keep everything organised.',
    icon: <CiBoxList />,
    component: <LogPreview />,
  },
  {
    title: 'Daily Targets',
    body: "Set daily practice goals and instantly see how you're tracking across the week.",
    icon: <BiTargetLock />,
    component: <TargetComponent />,
  },
  {
    title: 'Journaling',
    body: "Capture your goals, lesson notes, reflections, or anything else that shapes your musical journey.",
    icon: <IoIosJournal />,
    component: <DiaryComponent />,
  },
  {
    title: 'Audio Recording',
    body: 'Record your practice sessions and listen back to hear how your playing evolves over time.',
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
    body: 'Visualise your entire year of practice with a clear heat map that highlights your habits and trends.',
    icon: <FcHeatMap />,
    component: <HeatmapPreview />,
  },
  {
    title: 'Tags and Advanced Filtering',
    body: 'Use tags and advanced filters to break down your practice data and see exactly where your time goes.',
    icon: <FaHashtag />,
    component: <TagsPreview />,
  },
];

export default function AboutIndex() {
  return (
    <div>
      {/* <div className="min-h-screen w-screen flex flex-col items-center justify-center text-white rounded-t-full bg-dark">
        <div className="flex font-mono flex-col font-normal text-zinc-50 items-center justify-center md:w-2/3 lg:w-1/2 p-4 text-center">
          <h2 className="text-xl ">Make every practice count.</h2>
           <p className="mt-4 text-md">
  Track what you practise, review recordings, and build consistent habits with simple tools that support your growth.
          </p>  
        </div>
      </div> */}
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
