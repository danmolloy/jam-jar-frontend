'use client'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import InputField from "@/components/form/inputField";
import { useSession } from "next-auth/react";

export async function uploadAudioFile(file: File, accessToken: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/upload-url/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify({
      file_name: file.name,
      content_type: file.type
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to get upload URL');
  }

  const { upload_url, key } = await res.json();

  await fetch(upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file
  });

  return key; // use this to save metadata
}

export async function saveRecordingMetadata(key: string, metadata: {
  title: string
  notes?: string
  tags?: string[]
  location?: string
  date?: string 
}, accessToken: string) {
  const body = {
    s3_key: key,  
    ...metadata
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/save-recording/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save metadata');
  }
}

const AudioSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('Audio file is required')
    .test('fileType', 'Only audio files are allowed', (value) => {
      if (!value) return false;
      // Check if value has a type property (File or Blob)
      if (value && typeof value === 'object' && 'type' in value && typeof value.type === 'string') {
        return value.type.startsWith('audio/');
      }
      return false;
    }),
  title: Yup.string().required('Title is required'),
  notes: Yup.string(),
  tags: Yup.string(),
  location: Yup.string(),
  date: Yup.string(),
});

export default function CreateAudioPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Upload Audio</h1>
      <Formik
        initialValues={{
          file: null as File | null,
          title: '',
          notes: '',
          tags: '', // comma-separated
          location: '',
          date: '',
        }}
        validationSchema={AudioSchema}
        onSubmit={async (values, { resetForm }) => {
          setMessage('');
          setIsSubmitting(true);
          try {
            if (!session?.accessToken) {
              setMessage('You must be logged in to upload audio.');
              setIsSubmitting(false);
              return;
            }
            const key = await uploadAudioFile(values.file!, session.accessToken);
            await saveRecordingMetadata(key, {
              title: values.title,
              notes: values.notes,
              tags: values.tags ? values.tags.split(',').map(t => t.trim()) : [],
              location: values.location,
              date: values.date,
            }, session.accessToken);
            setMessage('Audio uploaded successfully!');
            resetForm();
          } catch (err: any) {
            setMessage('Upload failed: ' + (err.message || err.toString()));
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-4 max-w-md mt-4">
            <label className="flex flex-col m-2 my-4">
              Audio File*
              <input
                type="file"
                accept="audio/*"
                onChange={e => setFieldValue('file', e.currentTarget.files ? e.currentTarget.files[0] : null)}
              />
              {errors.file && touched.file && (
                <div className="text-red-500 text-sm">{errors.file as string}</div>
              )}
            </label>
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
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white rounded px-4 py-2 mt-2">
              {isSubmitting ? 'Uploading...' : 'Upload'}
            </button>
            {message && <div className="mt-2 text-green-600">{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  )
}