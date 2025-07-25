import Link from "next/link";
import AboutIndex from "./about";
import PricingIndex from "./pricing";
import Contact from "./contact";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function LandingPage() {
  return (
    <div className="w-screen min-h-[80vh] font-mono bg-[url(/background.png)] bg-size-[300px] bg-center bg-repeat"> {/* bg-[url(/background.png)] bg-size-[300px] bg-center bg-repeat */}
      <div className="relative h-screen flex flex-col items-center justify-center ">

{/*       <Image src={Jar} alt="Jam Jar" width={800/2} height={1024/2} className="-mt-48 "/>
 */}      <div className=" flex flex-col items-center justify-center ">
        <h1 className="-mt-[300px] font-bold text-8xl font-display">Jam Jar</h1>
        <p className="">the music practice studio</p>
        <Link href={"/register"} className="text-blue-600 flex flex-row items-center  p-2 m-2 rounded hover:underline">
          <p>Start</p>
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