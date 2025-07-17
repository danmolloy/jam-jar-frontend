import { auth } from "@/auth";
import GoalDetail from "@/components/goals/detailView";
import Login from "@/components/shared/login";
import { components } from "@/types/api";

type Goal = components["schemas"]["Goal"]

export default async function GoalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params


   if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
      return <Login />
    }
 
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

  return <GoalDetail session={session} goal={data} />;
}