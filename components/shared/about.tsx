import { BiTargetLock } from 'react-icons/bi';
import { RiRecordMailLine } from 'react-icons/ri';
import { IoIosJournal } from 'react-icons/io';
import { FaHashtag } from 'react-icons/fa6';
import { CiBoxList } from 'react-icons/ci';
import dynamic from 'next/dynamic';
import About from './about/index';
import { DateTime } from 'luxon';
import { FcHeatMap } from 'react-icons/fc';
import AboutText from './aboutText';

// Lazy load heavy preview components that use animations
const TargetComponent = dynamic(() => import('./about/targetComponent'), { ssr: true });
const DiaryComponent = dynamic(() => import('./about/diaryComponent'), { ssr: true });
const AudioPreview = dynamic(() => import('./about/audioPreview'), { ssr: true });
const TagsPreview = dynamic(() => import('./about/tagsPreview'), { ssr: true });
const LogPreview = dynamic(() => import('./about/logPreview'), { ssr: true });
const HeatmapPreview = dynamic(() => import('./about/heatmapPreview'), { ssr: true });

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
    body: 'Capture your goals, lesson notes, reflections, or anything else that shapes your musical journey.',
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
      <About />
      <AboutText />
    </div>
  );
}
