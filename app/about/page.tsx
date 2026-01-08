import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col p-4 lg:px-48 bg-dark text-white font-medium">
      <h1 className="text-4xl font-bold self-center">About Jam Jar</h1>
      <p className="mt-6 font-bold">Jam Jar is a practice journal for musicians.</p>
      <p className="mt-6">
        It helps you track what you practice, when you practice, and how your efforts accumulate
        over time. Jam Jar is a no-nonsense practice dashboard — focused on clarity and continuity
        rather than points, streaks, or performance pressure.
      </p>
      <p className="mt-6">
        How we hear or feel about our playing can change from day to day. Jam Jar gives you a place
        to document these thoughts alongside your work, helping you stay accountable and build on
        past sessions instead of starting from scratch each time.
      </p>
      <p className="mt-6">
        Rather than ratings, public practice logs, or gamified incentives, Jam Jar focuses on the
        fundamentals: showing up, keeping a record of what you’ve done, and gradually building
        something meaningful to look back on.
      </p>
      <div>
        <h2 className="mt-6 text-2xl font-bold">Jam Jar Features</h2>
        <ul>
          <li className="mt-2">- Log daily practice sessions</li>
          <li className="mt-2">- Track time spent on technical work, repertoire, or specific pieces</li>
          <li className="mt-2">- Upload audio recordings to document progress over time</li>
          <li className="mt-2">- Review daily, weekly, and yearly practice patterns</li>
          <li className="mt-2">- Track daily practice time in relation to a personal goal</li>
          <li className="mt-2">- Keep a private practice diary alongside your playing and recordings</li>
        </ul>
      </div>
      <div>
        <p className="mt-6">Jam Jar is designed for musicians who take their practice seriously. It’s suitable for students, professionals, and dedicated amateurs alike — anyone who values consistency and reflection in their practice.</p>
        <p className="mt-6">Jam Jar is built by a musician who wanted a better way to track practice over time — something more thoughtful than a spreadsheet, and more private and grounded than a public practice blog or social feed.</p>
        <p className="mt-6">Practice logs and audio recordings are private by default and are never shared without your consent.</p>
        <p className="mt-6">Jam Jar is still evolving, shaped by how musicians use it. If you’re curious, sign up for free and see what you can build over time.</p>
      </div>
      <Link href="/register"  className="border border-white p-2 rounded hover:underline cursor-pointer self-center mt-8">Get started</Link>
    </div>
  );
}
