import Link from "next/link";
import AboutIndex from "./about";
import PricingIndex from "./pricing";
import Contact from "./contact";
import { IoIosArrowRoundForward } from "react-icons/io";
import Hero from "./hero";

export default function LandingPage() {
  return (
    <div className="w-screen  min-h-[80vh]  font-medium bg-dark  "> {/* bg-[url(/background.png)] bg-size-[300px] bg-center bg-repeat */}
      <Hero />
      
     <AboutIndex />
       <PricingIndex landing={true} />
      
      <Contact />
    </div>
  )
}