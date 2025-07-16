'use client'
import { components } from "@/types/api"
import { Session } from "next-auth"
import Link from "next/link"

export type PracticeItem = components["schemas"]["PracticeItem"]

export default function SessionDetail({
  practiceItem,
  session
}: {
  practiceItem: PracticeItem
  session: Session
}) {

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this practice item?");
    if (!confirmed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${practiceItem.id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    if (res.ok) {
      console.log("Deleted successfully");
      window.location.href = "/items"; // or use router.push
    } else {
      console.error("Failed to delete");
    }
  }

  return (
    <div>
      {JSON.stringify(practiceItem)}
      <Link href={`/items/${practiceItem.id}/update`}>Update</Link>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  )
}