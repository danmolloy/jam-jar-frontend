import PricingIndex from "@/components/shared/pricing";

export default function AboutPage() {
  return (
    <div className="font-mono p-4">
      <h1>About Jam Jar</h1>
      <p>Jam Jar brings structure and motivation to your music practice. Whether you're a student, professional or amateur, Jam Jar will help you see improvements.</p>
      <div>
        <h2>Features</h2>
        <ul>
          <li>
            <p>Target Tracking</p>
            <p>Set your daily practice target and get an overview of your week.</p>
          </li>
          <li>
            <p>Daily Sessions</p>
            <p>Log individual practice sessions and write a daily journal on your practice.</p>
          </li>
          <li>
            <p>Audio Recording and Playback</p>
            <p>Upload and revisit your practice to hear your progress.</p>
          </li>
          <li>
            <p>Tags and Notes</p>
            <p>Add context to your practice. Track by piece, technique or goal.</p>
          </li>
          <li>
            <p>Visual Insights</p>
            <p>Heatmaps and charts that make your progress visible and rewarding.</p>
          </li>
          {/* <li>
            <p>Track Students</p>
            <p></p>
          </li> */}
          {/* <li>
            Assign Student Homework
          </li> */}
          {/* Streak Tracking */}
          {/* Email Reminders */}
          {/* Practice Blog */}
          {/* <li>
            <p>Reflect on session as a whole</p>
            <p></p>
          </li> */}
        </ul>
      </div>
      <div>
        <h2>Why Use Jam Jar?</h2>
        <p>It's difficult to keep a consistent practice routine. Jam Jar helps fix that by making practice visible and trackable.</p>
      </div>
      <PricingIndex />
      {/* CTA Sign up button */}
    </div>
  )
}