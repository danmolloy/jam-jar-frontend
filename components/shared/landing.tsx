import Link from "next/link";
import AboutIndex from "./about";
import PricingIndex from "./pricing";

export default function LandingPage() {
  return (
    <div className=" min-h-[80vh] font-mono p-4">
      <div className="h-screen flex flex-col items-center justify-center ">
        <h1 className="-mt-48 font-bold text-6xl font-display">Jam Jar</h1>
        <p className="">the music practice studio</p>
        <Link href={"/login"} className="text-amber-800 mt-4 hover:underline">get praticing</Link>
      </div>
      <AboutIndex />
      <PricingIndex />
      <div>
        <Link href={"/register"}>Sign up for free</Link>
      </div>
    </div>
  )
}