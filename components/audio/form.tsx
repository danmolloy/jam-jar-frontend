'use client'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import InputField from "@/components/form/inputField";
import { useSession } from "next-auth/react";
import { saveRecordingMetadata, uploadAudioFile } from "@/app/audio/create/lib"; 
import { components } from "@/types/api";
import { Session } from "next-auth";
import { useRouter } from "next/navigation"



type Recording = components["schemas"]['AudioRecording']


const AudioSchema = Yup.object().shape({
  
  title: Yup.string().required('Title is required'),
  notes: Yup.string(),
  tags: Yup.string(),
  location: Yup.string(),
  date: Yup.string(),
});

export default function AudioForm({mode, audioRecording, session}: {
  session: Session
  mode: "create"|"update"
  audioRecording?: Recording
}) {
  const [message, setMessage] = useState('');
  const [submitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    <div>
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
        onSubmit={async (values, { resetForm }) => {
          let formattedTags: string[] = [];
          if (typeof values.tags === 'string') {

  formattedTags = values.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
} else if (!Array.isArray(values.tags)) {
  formattedTags = [];
}

          handleUpdate(values);
          
        }}
      >
        {({ setFieldValue, errors, touched }) => (
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