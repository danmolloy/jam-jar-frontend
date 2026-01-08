import Link from "next/link";

export default function AboutText() {
  return (
    <div className=" p-4 py-16  bg-dark text-white text-lg  font-sans flex flex-col">
      <h2 className="font-sans font-medium md:text-4xl text-4xl m-4 mb-8 text-center">
        Your Practice Dashboard
      </h2>
      <p className="p-2 pt-6">
        Practice isn’t just about repeating something until it becomes automatic. Real improvement
        comes from practicing with intention, and Jam Jar is built around this philosophy. It’s a
        personal practice journal — a space to document your sessions and reflect on your progress.
      </p>
      <p className="p-2 pt-6">
        Keeping a practice diary makes you more aware of how you spend your time. You begin to
        notice patterns - what you struggle with, what helps you move forward, and what you may be
        avoiding.
      </p>
      <p className="p-2 pt-6">Practice doesn’t make perfect. It makes progress.</p>
      <p className="p-2 pt-6">And progress becomes visible when you take the time to capture it.</p>
      <p className="p-2 pt-6">
        Jam Jar gives you the space to notice, reflect, and grow — one practice at a time.
      </p>
      <Link href="/about" className="border border-white p-2 rounded hover:underline cursor-pointer self-center mt-8">Learn more</Link>
    </div>
  );
}
