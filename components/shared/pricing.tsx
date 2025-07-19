
const pricingTiers = [
  {
    byline: "Standard features for a casual user",
    name: "Basic",
    price: "Free",
    frequency: null,
    features: [
      "Set daily target",
      "Log unlimited amount of practice sessions",
      "Unlimited journaling",
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
      "Filter practice data by activity and hashtags",
      "Audio record your practice",
    ]
  }
]

export default function PricingIndex() {
  return (
    <div>
      <h2>Tiers</h2>
      <div className="flex flex-col md:flex-row items-start justify-center">

      {pricingTiers.map((i, index) => (
        <div key={index} className="border shadow m-4 p-4 rounded w-[90vw] md:w-[45vw]">
          <h2>{i.name}</h2>
          <p>{i.byline}</p>
          <h3 className="font-bold text-xl">{i.price}</h3>
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
    </div>
  )
}