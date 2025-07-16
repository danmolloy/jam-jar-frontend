import { auth } from "@/auth";
import SessionDetail, { PracticeItem } from "@/components/practice/detailView";
import Login from "@/components/shared/login";
import { components } from "@/types/api";


export default async function PracticeItemPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const { id } = await params


   if (!session || session.error === "RefreshAccessTokenError" || !session.accessToken) {
      return <Login />
    }
 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${id}/`,
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

  const data: PracticeItem = await res.json();

  return <SessionDetail session={session} practiceItem={data} />;
}