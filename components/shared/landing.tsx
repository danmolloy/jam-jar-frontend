import Link from "next/link";
import AboutIndex from "./about";
import PricingIndex from "./pricing";
import Contact from "./contact";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function LandingPage() {
  return (
    <div className="w-screen  min-h-[80vh]  font-medium bg-[url(/background.png)] bg-dark bg-size-[350px] bg-center bg-repeat"> {/* bg-[url(/background.png)] bg-size-[300px] bg-center bg-repeat */}
      <div className="relative h-[95vh] flex flex-col items-center justify-center ">

      <div className=" flex flex-col shadow items-center justify-center -mt-[200px] border bg-white text-dark rounded mx-4 backdrop-blur-xs py-4">
        <h1 className=" font-bold font-display text-8xl">Jam Jar</h1>
        <p className="mt-4 font-mono font-bold">Play, record, repeat.</p>
        <div className="my-8 flex flex-col items-center justify-center text-center mx-8">

        <p className="  ">Jam Jar enables you to track your practice, record sessions, and see your progress.</p>
        </div>
        <Link href={"/register"} className="bg-blue-600 text-white rounded flex flex-row items-center  font-medium border  py-1 px-2 text-sm mx-2  hover:underline">
          <p>Start</p>
                        <IoIosArrowRoundForward size={20}/>
          
          </Link>
      </div>
      </div>
     <AboutIndex />
       <PricingIndex landing={true} />
      
      <Contact />
    </div>
  )
}