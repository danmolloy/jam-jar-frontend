import { PracticeItem } from "@/components/practice/detailView";
import { DateTime } from "luxon";

const practice: PracticeItem[] = [{
  date: DateTime.now().toISO(),
  id: 1,
  activity: "Scales", 
  notes: "C, G and Bb Major.",
  tags: ["legato"],
  duration: 15
},
{
  date: DateTime.now().toISO(),
  id: 2,
  activity: "Excerpts", 
  notes: "Heldenleben, Beethoven 9, Mozart 40",
  tags: ["auditionPrep"],
  duration: 45
},
{
  date: DateTime.now().toISO(),
  id: 3,
  activity: "Concerto", 
  notes: "Haydn, Sibelius",
  tags: ["projection", "intonation"],
  duration: 45
}
]

export default function LogPreview() {

  const date = DateTime.now()

  return (
    <div className="relative bg-white border border-gray-400 rounded  p-2 mx-8  min-w-[80vw] lg:min-w-[40vw] ">
     <div className="">
          <h2 className="font-base text-base py-2">
            {date.toFormat('cccc dd LLL').toUpperCase()}
            
          </h2>
          <div className="">
            {practice
                .map((i, index) => (
                  <div
                    key={i.id}
                    className={` w-full flex flex-col justify-between items-center ${index % 2 === 1 && 'bg-slate-50'}`}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <p>
                        {i.activity} ({i.duration} mins)
                      </p>
                      
                    </div>
                    <p className="text-sm ml-2">{i.notes}</p>
                  </div>
                ))
            }
          </div>
          </div>
          </div>
  )
}