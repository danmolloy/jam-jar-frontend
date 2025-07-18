
const pricingTiers = [
  {
    byline: "Standard features for a casual user",
    name: "Basic",
    price: "Free",
    frequency: null,
    features: [
      "Log unlimited amount of practice sessions",
      "Basic data visualizations",
    ]
  },
  {
    byline: "Features for a serious musician",
    name: "Premium",
    price: "£11.99",
    frequency: "3 months",
    features: [
      "Log unlimited amount of practice sessions",
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
      {pricingTiers.map((i, index) => (
        <div key={index} className="border shadow my-4 p-4 rounded">
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
  )
}