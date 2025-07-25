import { auth } from "@/auth";
import CreateDiaryEntry from "@/components/diaryEntries/create";
import { components } from "@/types/api";

type Entry = components['schemas']['DiaryEntry']


export default async function PracticeItemUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params
 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/diary-entries/${id}/`,
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


  const data: Entry = await res.json();

  return <CreateDiaryEntry mode={"update"} session={session!}  diaryEntry={data}  
  />;
}