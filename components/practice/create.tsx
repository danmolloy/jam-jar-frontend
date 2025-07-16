'use client'
import { components } from "@/types/api";
import { Field, FieldArray, Formik } from "formik";
import { Session } from "next-auth";
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";
import ButtonSecondary from "../form/buttonSecondary";
import { PracticeItem } from "./detailView";
import { useRouter } from "next/navigation";


export default function CreateSession({
  session,
  mode="create",
  practiceItem
}: {
  session: Session
  mode: "create"|"update"
  practiceItem?: PracticeItem & {tags: string[]}
}) {
  const router = useRouter();

  let initialVals = mode === "create" ? {
    activity: "",
    notes: "",
    duration: 0,
    tags: [""],
    rating: 1,
  } 
  : {
    activity: practiceItem!.activity ?  practiceItem!.activity : "",
    notes: practiceItem!.notes ?  practiceItem!.notes : "",
    duration: practiceItem!.duration ? practiceItem!.duration : 0,
    tags: practiceItem!.tags ? practiceItem!.tags : [""],
    rating: practiceItem!.rating ? practiceItem!.rating : 3,
    
    
  }

  const handleCreate = async (values: {
    activity: string;
    notes: string;
    rating: number;
    tags: string[]
    duration: number
  }) => {
    values.tags = values.tags.filter(tag => tag.length > 0);
try {
    const res = mode === "create" 
    ?  await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/practice-items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`, 
      },
      body: JSON.stringify(values),
    })
    : await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${practiceItem!.id}/`,
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
    <div className="flex flex-col">
      <h1>Add Session</h1>
      <Formik 
        initialValues={initialVals}
        onSubmit={async (values, actions) => {
          await handleCreate(values);
        }}
        //validationSchema={{}}
      >
        {props => (
         <form onSubmit={props.handleSubmit}>
                        <InputField label="Activity" type="text" name="activity" error={props.errors.activity} />

            <InputField label="Notes" type="text" name="notes" error={props.errors.notes} />
            
            <InputField error={props.errors.rating} label="Rating" name={`rating`} type="number" min={0} max={5}/>
            <InputField 
                    error={props.errors.duration}
                    label="Duration"
                    name={`duration`}
                    type="number" min={1} max={180} 
                  />
            <FieldArray name="tags"
            render={arrayHelpers => (
              <div>
                <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {props.values.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Field
                    name={`tags[${index}]`}
                    placeholder="#hashtag"
                    className="border p-1 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => arrayHelpers.push('')}
              className="text-blue-500 underline"
            >
              Add Hashtag
            </button>
            </div>
              </div>
            )}
            />
            <ButtonPrimary type="submit" label="Submit" handleClick={() => {}} />
         </form>
       )}
      </Formik>
    </div>
  )
}