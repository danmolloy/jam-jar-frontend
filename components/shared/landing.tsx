import Link from "next/link";
import AboutIndex from "./about";
import PricingIndex from "./pricing";
import Image from "next/image";
import Jar from "../../public/hero.png"
import Contact from "./contact";

export default function LandingPage() {
  return (
    <div className="w-screen min-h-[80vh] font-mono p-4">
      <div className="relative h-screen flex flex-col items-center justify-center ">

      <Image src={Jar} alt="Jam Jar" width={800/2} height={1024/2} className="-mt-48 "/>
      <div className=" flex flex-col items-center justify-center ">
        <h1 className="-mt-[400px] font-bold text-6xl font-display">Jam Jar</h1>
        <p className="">the music practice studio</p>
        <Link href={"/login"} className="text-amber-800  hover:underline">get praticing</Link>
      </div>
      </div>
      <AboutIndex />
      <PricingIndex />
      <div className="h-[50vh] w-screen flex flex-col items-center pt-24">
        <Link href={"/register"} className="text-2xl bg-purple-700 hover:bg-blue-600 rounded p-2 text-white ">Sign up for free</Link>
      </div>
      <Contact />
    </div>
  )
}