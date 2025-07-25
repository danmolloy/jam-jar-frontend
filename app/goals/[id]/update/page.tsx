import { auth } from "@/auth";
import CreateGoal from "@/components/goals/create";
import { components } from "@/types/api";

export type Goal = components["schemas"]["Goal"]

export default async function GoalUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params
 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/goals/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load session");
  }

  const data: Goal = await res.json();

  return <CreateGoal mode={"update"} session={session!} goal={data} />;
}