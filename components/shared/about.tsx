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
    <div>
      <div className="min-h-screen w-screen flex flex-col items-center justify-center text-white rounded-t-full bg-dark">
        <div className="flex flex-col items-center justify-center w-1/2 ">
        <h1 className="font-serif text-4xl ">Practice makes perfect.</h1>
        <p className="mt-4">But it isn&apos;t just about repitition - it&apos;s about attention and decisions. Each note played, each phrase repeated builds not only skill but awareness. The real progress hides in the small, consistent steps. Practice is about the journey taken.</p>
        </div>
      </div>
      <div className="bg-gray-100  flex flex-col pb-4 min-h-screen items-center justify-center">
  <h1 className="font-serif md:text-7xl text-6xl m-4">Capture your practice</h1>

  <div className="m-4 grid grid-cols-1 md:grid-cols-4 gap-4">
    {featuresArr.map((i, index) => (
      <div
        key={index}
        className={` border rounded-xl bg-white p-6 flex flex-col
          ${index === 0 ? "md:col-span-2" : ""}
          ${index === featuresArr.length - 1 ? "md:col-span-2" : ""}`}
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
  )
}