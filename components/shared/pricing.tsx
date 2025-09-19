import Link from "next/link"
import { IoIosArrowRoundForward, IoIosCheckmark } from "react-icons/io";


const pricingTiers = [
  {
    byline: "Standard features for a casual user",
    name: "Basic",
    price: "Free",
    frequency: null,
    features: [
      "Log unlimited amount of practice sessions",
      "Track daily practice minutes target",
      "Journal 40 characters per day",
      "Data visualizations, including heatmap, bar charts and rings",
    ]
  },
  {
    byline: "Features for a serious musician",
    name: "Premium",
    price: "£11.99",
    frequency: "3 months",
    features: [
      "All basic features",
      "Audio record your practice (5 recordings per day, 50MB max each)",
      "Journal 5000 characters per day",
      "Filter practice data by activity and hashtags",
    ]
  }
]

export default function PricingIndex({landing}: {landing: boolean}) {
  return (
    <div id="pricing" className={` p-4 font-medium flex  flex-col items-center justify-center min-h-screen bg-dark`}>
      <h2 className=" font-serif md:text-7xl text-6xl m-4 text-white">Start for free and upgrade for more insight.</h2>
      <div className="flex flex-col md:flex-row items-start justify-center p-4">

      {pricingTiers.map((i, index) => (
        <div key={index} className="border-2 rounded shadow m-2 p-4  border-blue-600 bg-white w-[80vw] md:w-[40vw]  min-h-[300px]">
          <h2 className="font-semibold text-2xl">{i.name}</h2>
          <p>{i.byline}</p>
          <h3 className="font-bold text-3xl my-4 text-center">{i.price}{i.frequency && <span className="text-base font-medium">/{i.frequency}</span>}</h3>
          <div>
            
          {i.features.map((j, jndex) => (
            <div key={jndex} className="flex flex-row items-start justify-start">
              <IoIosCheckmark size={24}/> <p>{j}</p>
            </div>
          ))}
        </div>
        </div>
      ))}
      </div>
      {landing && <div className=" w-screen flex flex-col items-center">
              <Link href={"/register"} className="text-xl flex flex-row items-center   border   bg-black text-white rounded py-1 px-2 hover:underline ">
              <p className="text-md">Start for free</p>
              <IoIosArrowRoundForward size={24}/>
              </Link> 
            </div>}
    </div>
  )
}