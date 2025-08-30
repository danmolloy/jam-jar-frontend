import Link from "next/link";
import AboutIndex from "./about";
import PricingIndex from "./pricing";
import Contact from "./contact";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function LandingPage() {
  return (
    <div className="w-screen  min-h-[80vh] font-mono font-medium bg-[url(/background.png)] bg-neutral-100 bg-size-[300px] bg-center bg-repeat"> {/* bg-[url(/background.png)] bg-size-[300px] bg-center bg-repeat */}
      <div className="relative h-[95vh] flex flex-col items-center justify-center ">

      <div className=" flex flex-col items-center justify-center ">
        <h1 className="-mt-[300px] font-bold font-display text-8xl">Jam Jar</h1>
        <p className="mt-4 ">Play, record, repeat.</p>
        <div className="my-8 flex flex-col items-center justify-center text-center mx-8">

        <p className="">Jam Jar enables you to track your practice, record sessions, and see your progress.</p>
        </div>
        <Link href={"/register"} className="bg-primary flex flex-row items-center text-black font-medium border border-black p-2 mx-2  hover:underline">
          <p>START</p>
                        <IoIosArrowRoundForward size={24}/>
          
          </Link>
      </div>
      </div>
     <AboutIndex />
       <PricingIndex landing={true} />
      
      <Contact />
    </div>
  )
}