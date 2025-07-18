'use client'

import { components } from "@/types/api"
import { Formik } from "formik"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import ButtonPrimary from "../form/buttonPrimary"
import InputField from "../form/inputField"

type DiaryEntry = components["schemas"]["DiaryEntry"]

export default function CreateDiaryEntry({
  session,
  mode="create",
  diaryEntry
}: {
  session: Session
  mode: "create"|"update"
  diaryEntry?: DiaryEntry|undefined
}) {
  const router = useRouter();

  const initialVals = {
    title: mode === "update" ? diaryEntry!.title : "",
    body:  mode === "update" ? diaryEntry!.body : "",
  }

  const handleCreate = async (values: {
    title: string;
    body: string;
  }) => {
try {
    const res = mode === "create" 
    ?  await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/diary-entries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`, 
      },
      body: JSON.stringify(values),
    })
    : await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/diary-entries/${diaryEntry!.id}/`,
      {
        method: "PATCH", // or PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) {
       const errorData = await res.json();
  throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
    } else {

      router.push("/");
    }
    
   
          } catch (err) {
            console.error(err)
          }
  }

  return (
    <div>
      <h1>Create Entry</h1>
      <Formik
        initialValues={initialVals}
        onSubmit={async (values) => {
          await handleCreate(values)
        }}>
          {props => (
            <form onSubmit={props.handleSubmit}>
              <InputField label="Title" type="text" name="title" error={props.errors.title}/>
              <InputField label="Body" type="textarea" name="body" error={props.errors.body} />
              <ButtonPrimary type="submit" label="Submit" handleClick={() => {}} />
            </form>
          )}
        </Formik>
    </div>
  )
}