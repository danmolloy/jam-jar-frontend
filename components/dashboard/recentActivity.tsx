import { DateTime } from "luxon"
import { PracticeItem } from "../practice/detailView"
import { FaStar } from "react-icons/fa";

export default function RecentActivity({practiceItems}: {
  practiceItems: PracticeItem[]
}) {
  return (
    <div>
      <h2>Recent Activity</h2>
      <div>
        {practiceItems.map(i => (
          <div key={i.id}>
            <p>{DateTime.fromISO(i.date).toFormat('ccc dd LLLL')}</p>
            
              <div >
              <p >{i.activity} ({i.duration} mins)</p>
              <p>{i.notes}</p>
              <div className="flex flew-row">
                {new Array(i.rating).fill(null).map((_, index) => (
                <div key={index}>
                  <FaStar />
                </div>
              ))}
              </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}