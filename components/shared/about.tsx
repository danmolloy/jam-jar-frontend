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
    <div id="about" className="flex font-medium flex-col p-4 py-16 bg-black text-white border-t">
      <div className="pb-16 flex flex-col items-center justify-center md:mx-4 self-center">
                <h3 className="font-bold font-mono text-4xl self-start">ABOUT</h3>

      <p className="text-lg py-2">Jam Jar brings structure and motivation to your music practice. Whether you&apos;re a student, professional or amateur, Jam Jar will help you see improvements.</p>
      </div>
      <div className="flex flex-row flex-wrap items-start justify-start border border-white ">
        {featuresArr.map((i, index) => (
          <div key={index} className="md:mx-4  rounded p-4 m-4">
            <div className="flex flex-row items-center justify-start">
              <div className="w-8 ">
              {i.icon}
              </div>
            <h3 className="font-semibold text-xl ">{i.title}</h3>
            </div>
            <p className="text-lg font-normal ml-8">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}