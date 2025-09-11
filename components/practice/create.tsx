'use client'
import { Field, FieldArray, Formik } from "formik";
import { Session } from "next-auth";
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";
import { PracticeItem } from "./detailView";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "../../app/lib/api";


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

  // Helper function to format date for HTML input
  const formatDateForInput = (date: string | Date) => {
    if (!date) return new Date().toISOString().split('T')[0];
    
    // If it's already a string in YYYY-MM-DD format, return it
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    }
    
    // If it's an ISO string or Date object, convert to YYYY-MM-DD
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  };

  const initialVals = mode === "create" ? {
    activity: "",
    notes: "",
    duration: 0,
    tags: [""],
    rating: 1,
    date: formatDateForInput(new Date()),
  } 
  : {
    activity: practiceItem!.activity ?  practiceItem!.activity : "",
    notes: practiceItem!.notes ?  practiceItem!.notes : "",
    duration: practiceItem!.duration ? practiceItem!.duration : 0,
    tags: practiceItem!.tags ? practiceItem!.tags : [""],
    rating: practiceItem!.rating ? practiceItem!.rating : 3,
    date: formatDateForInput(practiceItem!.date || new Date())
  }

  const handleCreate = async (values: {
    activity: string;
    notes: string;
    rating: number;
    tags: string[]
    duration: number;
    date: string;
  }) => {
    values.tags = values.tags.filter(tag => tag.length > 0);
    
    // Ensure date is in the correct format for the backend
    const submissionData = {
      ...values,
      date: values.date // Already in YYYY-MM-DD format from the input
    };
    
    try {
      const url = mode === "create" 
        ? `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/`
        : `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${practiceItem!.id}/`;
      
      const method = mode === "create" ? "POST" : "PATCH";
      
      const res = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(submissionData),
      }, session);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      // Show user-friendly error message
      if (err instanceof Error && err.message.includes("Token expired")) {
        alert("Your session has expired. Please refresh the page and try again.");
      } else {
        alert("Failed to save practice item. Please try again.");
      }
    }
  }

  const handleDelete = async () => {
    if (!practiceItem!.id) {
      return;
    }

    try {
      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${practiceItem!.id}/`, 
        { method: "DELETE" }, 
        session
      );
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
      } else {
        router.push("/");
      }
    } catch(e) {
      console.log(e);
      if (e instanceof Error && e.message.includes("Token expired")) {
        alert("Your session has expired. Please refresh the page and try again.");
      } else {
        alert("Failed to delete practice item. Please try again.");
      }
    }
  }

  return (
    <div className="flex flex-col p-4 ">
      <h1>{mode === "create" ? "Add" : "Update"} Practice</h1>
      <Formik 
        initialValues={initialVals}
        onSubmit={async (values) => {
          await handleCreate(values);
        }}
        //validationSchema={{}}
      >
        {props => (
         <form onSubmit={props.handleSubmit}>
                        <InputField label="Activity" type="text" name="activity" error={props.errors.activity} />
            <InputField label="Date" type="date" name="date" error={props.errors.date} />
            <InputField label="Notes" type="text" name="notes" error={props.errors.notes} />
            
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
            <div className="flex flex-wrap flex-col  mx-2 my-4">
              <label>Tags</label>
              {props.values.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-1 ">
                  <Field
                    name={`tags[${index}]`}
                    //placeholder="#hashtag"
                    className="border border-neutral-400 rounded shadow-xs my-1 p-1"
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
              className="text-blue-600 underline"
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
      {mode === "update" && <button onClick={() => handleDelete()} className="w-24 border border-red-500 text-red-500 rounded hover:bg-red-50">
        Delete
      </button>}
    </div>
  )
}