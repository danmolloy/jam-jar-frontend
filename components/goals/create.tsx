'use client'
import { Field, Formik } from "formik"
import { Session } from "next-auth";
import { Goal } from "@/app/goals/[id]/update/page";
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";


export default function CreateGoal({
  mode="create",
  session,
  goal,
}: {
  mode: "create"|"update"
  session: Session
  goal?: Goal
}) {
  
  if (!session?.user?.id) return <p>Loading session...</p>;

  const today = new Date().toISOString().split("T")[0];

  const initialVals = mode === "update" 
  ? {
    category: goal?.category || "streak",
    title: goal?.title || "",
    description: goal?.description || "",
    target_count: goal?.target_count || 0,
    start_date: goal?.start_date || today,
    end_date: goal?.end_date || today,
    creation_date: goal?.creation_date || new Date().toISOString(),
    assigned_to: goal?.assigned_to || Number(session!.user!.id)
  } 
  : {
    category: "streak",
    title: "",
    description: "",
    target_count: 0,
    start_date: today,
    end_date: today,
    creation_date: new Date().toISOString(),
    assigned_to: Number(session!.user!.id)
  } 


  const handleSubmit = async (values: {
    category: string;
    title: string;
    description: string;
    target_count: number;
    start_date: string;
    end_date: string;
    creation_date: string;
    assigned_to: number;
  }) => {
try {
            const res = mode === "create" 
            ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/goals/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`, // or however you're managing auth
      },
      body: JSON.stringify(values),
    }) 
    :await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/goals/${goal!.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`, // or however you're managing auth
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
       const errorData = await res.json();
  console.error("API Error Response:", errorData);
  throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
    }
    const data = await res.json();
          } catch (err) {
            console.error(err)
          }
  }

  return (
    <div className="flex flex-col">
      <h1>Create Goal</h1>
      <Formik
      initialValues={initialVals}
        onSubmit={async (values) => {
          handleSubmit(values)
        }}
        //validationSchema={{}}
        >
        {props => (
          <form onSubmit={props.handleSubmit}>
              <InputField label="Title" type="text" name="title" error={props.errors.title} />
              <InputField label="Description" type="text" name="description" error={props.errors.description} />

            
          <label className="flex flex-col m-2 ">
            Type
            <Field className="border rounded p-2 my-2 w-60" as="select" name="category">
             <option value="streak">Streak</option>
             <option value="time spent">Time Spent</option>
             <option value="session count">Session Count</option>
           </Field>
          </label>
            <InputField label="Count" name={`target_count`} type="number" min={0} max={1000} error={props.errors.target_count} />
            <InputField 
            label="Start Date"
              type="date"
              name="start_date"
              error={props.errors.start_date}
            />
            <InputField 
            label="End Date"
              type="date"
                name="end_date"
              error={props.errors.end_date}
            />
            <ButtonPrimary type="submit" label="Submit" handleClick={() => {}}/>
          </form>
        )}
      </Formik>
    </div>
  )
}