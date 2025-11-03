import { BiTargetLock } from 'react-icons/bi';
import { RiRecordMailLine } from 'react-icons/ri';
import { IoIosJournal } from 'react-icons/io';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaHashtag } from 'react-icons/fa6';
import { CiBoxList } from 'react-icons/ci';

const featuresArr: {
  title: string;
  body: string;
  icon: React.ReactNode;
}[] = [
  {
    title: 'Practice Logging',
    body: 'Keep a record of what you practiced, for how long and when. You can add notes and hashtags to your session.',
    icon: <CiBoxList />,
  },
  {
    title: 'Daily Targets',
    body: "Set a target duration to practice each day. At a quick glance, you can see how you've done across the week.",
    icon: <BiTargetLock />,
  },
  {
    title: 'Journaling',
    body: "Write about anything - what you're aiming towards, lesson notes or just some thoughts you've had that day.",
    icon: <IoIosJournal />,
  },
  {
    title: 'Audio Recording',
    body: 'Record your practice and listen back to how your playing has developed over time.',
    icon: <RiRecordMailLine />,
  },
  {
    title: 'Visual Insights',
    body: 'Spot trends in your practice with easy-to-read data displays including a week bar chart, annual heat map and daily rings.',
    icon: <IoBarChartSharp />,
  },
  {
    title: 'Tags and Advanced Filtering',
    body: 'Sort and filter your data by activity or hashtag to see what you’re putting time into.',
    icon: <FaHashtag />,
  },
];

export default function AboutIndex() {
  return (
    <div>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center text-white rounded-t-full bg-dark">
        <div className="flex flex-col items-center justify-center lg:w-1/2 p-4 text-center">
          <h1 className="font-serif text-4xl ">Practice makes perfect.</h1>
          <p className="mt-4">
            But progress doesn&apos;t happen overnight. Progress happens over days, weeks and years
            in small, consistent steps and with constant reflection of the decisions you take.
            Practice is about the journey taken.
          </p>
        </div>
      </div>
      <div
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
      </div>
    </div>
  );
}
