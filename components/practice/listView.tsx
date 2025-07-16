import { components } from "@/types/api"
import Link from "next/link"
import { PracticeItem } from "./detailView"


export default function PracticeItemList({
  items
}: {
  items: PracticeItem[]
}) {

  

  return (
    <div>
      {items.map(i => (
        <Link href={`/items/${i.id}`} key={i.id}>
        {i.id}
        </Link>
      ))}
    </div>
  )
}