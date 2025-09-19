'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import InputField from "@/components/form/inputField";
import { components } from "@/types/api";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";



type Recording = components["schemas"]['AudioRecording']
type UserData = components["schemas"]["User"]


const AudioSchema = Yup.object().shape({
  
  title: Yup.string().required('Title is required'),
  notes: Yup.string(),
  tags: Yup.string(),
  location: Yup.string(),
  date: Yup.string(),
});

export default function AudioForm({mode, audioRecording}: {
  mode: "create"|"update"
  audioRecording?: Recording
}) {
  const { data: session, status } = useSession();
  const [data, setData] = useState<UserData|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('');
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Wait for session to load
      if (status === "loading") {
        return;
      }
      
      if (status === "unauthenticated" || !session?.accessToken) {
        setError("No access token")
        setLoading(false)
        return
      }
  
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/me/`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })
  
          if (!res.ok) {
            setError(`Error: ${res.status}`)
            setLoading(false)
            return
          }
  
          const result = await res.json()
          setData(result)
        } catch (err) {
          console.log(err)
          setError("Failed to fetch user data")
        } finally {
          setLoading(false)
        }
      }
  
      fetchData()
    }, [session, status])
  
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!data) return null

  const handleUpdate = async (values: {
    title: string;
    notes: string | undefined;
    tags: string | string[] | undefined;
    location: string | undefined;
    date: string;
  }) => {
    try {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/${audioRecording!.id}/`, {
    method: "PATCH", // or PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
body: JSON.stringify({
  ...values,
  tags: values.tags as string[],
}),
  });

  

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save metadata');
  } else {

      router.push("/");
    }
    } catch(e) {
      console.log(e);

    }

  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this recording?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/${audioRecording!.id}/`, {
    method: "DELETE", // or PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete');
  } else {

      router.push("/");
    }

    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="relative">
      <h1>{mode === "create" ? "Upload" : "Update"} Audio</h1>
      
      <Formik
        initialValues={{
          //file: null as File | null,
          title: audioRecording ? audioRecording.title : '',
          notes: audioRecording ? audioRecording.notes :'',
  tags: audioRecording?.tags?.join(', ') ?? '',
                location: audioRecording ? audioRecording.location :'',
          date: audioRecording ? audioRecording.date :'',
        }}
        validationSchema={AudioSchema}
        onSubmit={async (values, ) => {
          let formattedTags: string[] = [];
          if (typeof values.tags === 'string') {

  formattedTags = values.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
} else if (!Array.isArray(values.tags)) {
  formattedTags = [];
}
        setIsSubmitting(true);
          handleUpdate({...values, tags: formattedTags});
          
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4 max-w-md mt-4">
            
            <InputField
              label="Title*"
              name="title"
              type="text"
              error={touched.title ? errors.title as string : undefined}
            />
            <InputField
              label="Notes"
              name="notes"
              type="text"
              error={touched.notes ? errors.notes as string : undefined}
            />
            <InputField
              label="Tags (comma separated)"
              name="tags"
              type="text"
              error={touched.tags ? errors.tags as string : undefined}
            />
            <InputField
              label="Location"
              name="location"
              type="text"
              error={touched.location ? errors.location as string : undefined}
            />
            <InputField
              label="Date"
              name="date"
              type="date"
              error={touched.date ? errors.date as string : undefined}
            />
            <button type="submit" disabled={submitting} className="bg-blue-600 text-white rounded px-4 py-2 mt-2">
              {submitting ? 'Updating...' : 'Update'}
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
          </Form>
        )}
      </Formik>
      <button onClick={() => handleDelete()} className="self-center hover:bg-red-50 border border-red-500 text-red-500 rounded">
        Delete
      </button>
    </div>
  )
}