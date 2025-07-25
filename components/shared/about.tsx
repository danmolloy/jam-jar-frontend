import { BiTargetLock } from "react-icons/bi";
import { RiRecordMailLine } from "react-icons/ri";
import { IoIosJournal } from "react-icons/io";
import { IoBarChartSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";



const featuresArr: {
  title: string
  body: string
  icon: React.ReactNode
}[] = [
  {
    title: "Daily Targets",
    body: "Set daily practice goals and get a feel for how you're tracking over time.",
    icon: <BiTargetLock />
  },
  {
    title: "Practice Logging",
    body: "Keep a record of what you practiced, when and how it went.",
    icon: <CiBoxList />
  },
  {
    title: "Audio Recording",
    body: "Record your jams, listen back anytime, and hear how far you've come.",
    icon: <RiRecordMailLine />
  },
  {
    title: "Journaling",
    body: "Drop in your thoughts, track your wins, and figure out what’s clicking.",
    icon: <IoIosJournal />
  },
  {
    title: "Visual Insights",
    body: "Spot trends in your practice with easy-to-read charts and heatmaps.",
    icon: <IoBarChartSharp />
  },
  {
    title: "Tags and Advanced Filtering",
    body: "Sort and filter by hashtag or vibe to see what you’re really putting time into.",
    icon: <FaHashtag />
  }
]

export default function AboutIndex() {
  return (
    <div id="about" className="flex flex-col p-4 py-16 bg-black text-white">
      <div className="pb-24 flex flex-col items-center justify-center md:w-[50vw] self-center">
                <h3 className="font-semibold font-mono text-4xl">Jam Jar</h3>

      <p className="text-lg">Jam Jar brings structure and motivation to your music practice. Whether you&apos;re a student, professional or amateur, Jam Jar will help you see improvements.</p>
      </div>
      <div className="flex flex-row flex-wrap items-start justify-start border border-white rounded">
        {featuresArr.map((i, index) => (
          <div key={index} className="md:w-[40vw]  rounded p-4 m-2">
            <div className="flex flex-row items-center justify-start">
              {i.icon}
            <h3 className="font-semibold text-xl ml-2">{i.title}</h3>
            </div>
            <p className="text-lg">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}