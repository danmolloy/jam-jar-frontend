import Link from "next/link";

export default function LandingPage() {
  return (
    <div className=" min-h-[80vh] font-mono p-4">
      <div className="h-screen flex flex-col items-center justify-center ">
        <h1 className="-mt-48 font-bold text-6xl font-display">Jam Jar</h1>
        <p className="">the music practice studio</p>
        <Link href={"/login"} className="text-amber-800 mt-4 hover:underline">get praticing</Link>
      </div>
      <div className="pb-36">
        <h2>about</h2>
        <p>Jam Jar is your personal practice companion. Whether you're a student, teacher or flying solo, Jam Jar helps you stay motivated, track your progress, and reflect on your journey through sound and stats.</p>
      </div>
      <div className="pb-36">
        <h2>features</h2>
        <ul>
          <li>- daily, weekly & yearly overview</li>
          <li>- record and save practice sessions</li>
          <li>- unlock achievements and build streaks</li>
          <li>- assign homwork and monitor student activity</li>
          <li>- add notes, tags and ratings to each practice</li>
          <li>- visualise your growth with charts</li>
        </ul>
      </div>
      
    </div>
  )
}