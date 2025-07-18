
const featuresArr = [
  {
    title: "Target Tracking",
    body: "Set daily practice targets and get an overview of your week."
  },
  {
    title: "Daily Sessions",
    body: "Log individual practice sessions and write a daily journal on your practice."
  },
  {
    title: "Audio Recording and Playback",
    body: "Upload and revisit your practice to hear your progress."
  },
  {
    title: "Visual Insights",
    body: "Get an overview of your habits and progress with charts and heatmaps"
  },
  {
    title: "Tags and Advanced Filtering",
    body: "Filter your charts by hashtag or activity"
  }
]

export default function AboutIndex() {
  return (
    <div id="about">
      <h1>About Jam Jar</h1>
      <p>Jam Jar brings structure and motivation to your music practice. Whether you're a student, professional or amateur, Jam Jar will help you see improvements.</p>
      <div>
        {featuresArr.map((i, index) => (
          <div key={index}>
            <p>{i.title}</p>
            <p>{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}