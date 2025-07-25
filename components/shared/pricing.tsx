import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io";


const pricingTiers = [
  {
    byline: "Standard features for a casual user",
    name: "Basic",
    price: "Free",
    frequency: null,
    features: [
      "Track daily practice minutes target",
      "Log unlimited amount of practice sessions",
      "Journal 140 characters per day",
      "Basic data visualizations",
    ]
  },
  {
    byline: "Features for a serious musician",
    name: "Premium",
    price: "£11.99",
    frequency: "3 months",
    features: [
      "All basic features",
      "Advanced data visualizations",
      "Unlimited journaling",
      "Filter practice data by activity and hashtags",
      "Audio record your practice",
    ]
  }
]

export default function PricingIndex({landing}: {landing: boolean}) {
  return (
    <div id="pricing" className={`${landing ? "bg-cyan-400" : "bg-white"} py-16 flex flex-col items-center`}>
      <h2 className="font-semibold font-mono text-4xl self-center">Pricing</h2>
      <div className="flex flex-col md:flex-row items-start justify-center">

      {pricingTiers.map((i, index) => (
        <div key={index} className="border shadow m-4 p-4 rounded w-[90vw] md:w-[45vw] bg-white min-h-[300px]">
          <h2 className="font-semibold text-2xl">{i.name}</h2>
          <p>{i.byline}</p>
          <h3 className="font-bold text-xl my-4 text-center">{i.price}{i.frequency && <span className="font-medium">/{i.frequency}</span>}</h3>
          <div>
            
          {i.features.map((j, jndex) => (
            <p key={jndex}>
              - {j}
            </p>
          ))}
        </div>
        </div>
      ))}
      </div>
      {landing && <div className=" w-screen flex flex-col items-center pt-24">
              <Link href={"/register"} className="text-xl flex flex-row items-center  text-black rounded p-2 hover:underline ">
              <p>Get Started</p>
              <IoIosArrowRoundForward size={24}/>
              </Link> 
            </div>}
    </div>
  )
}