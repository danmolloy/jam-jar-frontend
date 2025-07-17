import { auth } from "@/auth";
import CreateSession from "@/components/practice/create";
import { PracticeItem } from "@/components/practice/detailView";
import Login from "@/components/shared/login";


export default async function PracticeItemUpdatePage({ params }: { params: Promise<{ id: string }> }) {
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

  return <CreateSession mode={"update"} session={session}     practiceItem={{ ...data, tags: data.tags ?? [] }}
  />;
}