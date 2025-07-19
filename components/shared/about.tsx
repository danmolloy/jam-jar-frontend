const featuresArr: {
  title: string
  body: string
}[] = [
  {
    title: "Daily Targets",
    body: "Set daily practice goals and get a feel for how you're tracking over time.",
  },
  {
    title: "Practice Logging",
    body: "Keep a record of what you practiced, when and how it went.",
  },
  {
    title: "Audio Recording",
    body: "Record your jams, listen back anytime, and hear how far you've come.",
  },
  {
    title: "Journaling",
    body: "Drop in your thoughts, track your wins, and figure out what’s clicking.",
  },
  {
    title: "Visual Insights",
    body: "Spot trends in your practice with easy-to-read charts and heatmaps.",
  },
  {
    title: "Tags and Advanced Filtering",
    body: "Sort and filter by hashtag or vibe to see what you’re really putting time into.",
  }
]

export default function AboutIndex() {
  return (
    <div id="about" className="flex flex-col p-4">
      <div className="pb-48 flex flex-col items-center justify-center md:w-[50vw] self-center">
                <h3 className="font-semibold text-2xl">Jam Jar</h3>

      <p className="text-lg">Jam Jar brings structure and motivation to your music practice. Whether you&apos;re a student, professional or amateur, Jam Jar will help you see improvements.</p>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {featuresArr.map((i, index) => (
          <div key={index} className="md:w-[40vw]  rounded p-4 m-2">
            <h3 className="font-semibold text-xl">{i.title}</h3>
            <p className="text-lg">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}