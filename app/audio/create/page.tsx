'use client';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import InputField from '@/components/form/inputField';
import { useSession } from 'next-auth/react';
import { saveRecordingMetadata, uploadAudioFile } from './lib';
import Link from 'next/link';
import { components } from '@/types/api';
import ButtonPrimary from '@/components/form/buttonPrimary';

type UserData = components['schemas']['User'];

// Maximum file size: 50MB (50 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 50 * 1024 * 1024;
// Maximum uploads per day
const MAX_DAILY_UPLOADS = 5;

// Function to check today's upload count
async function getTodayUploadCount(accessToken: string): Promise<number> {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recordings/?date=${today}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch today's uploads");
      return 0;
    }

    const recordings = await res.json();
    return Array.isArray(recordings) ? recordings.length : 0;
  } catch (error) {
    console.error("Error checking today's uploads:", error);
    return 0;
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
    })
    .test(
      'fileSize',
      `File size must be less than ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB`,
      (value) => {
        if (!value) return false;
        // Check if value has a size property (File or Blob)
        if (
          value &&
          typeof value === 'object' &&
          'size' in value &&
          typeof value.size === 'number'
        ) {
          return value.size <= MAX_FILE_SIZE;
        }
        return false;
      },
    ),
  title: Yup.string().required('Title is required'),
  notes: Yup.string(),
  tags: Yup.string(),
  location: Yup.string(),
  date: Yup.string().required('Date is required'),
});

export default function CreateAudioPage() {
  const [message, setMessage] = useState('');
  const [submitting, setIsSubmitting] = useState(false);
  const [dailyUploadCount, setDailyUploadCount] = useState<number | null>(null);
  const [checkingUploads, setCheckingUploads] = useState(true);
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') {
        return;
      }

      if (status === 'unauthenticated' || !session?.accessToken) {
        setError('No access token');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/me/`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) {
          setError(`Error: ${res.status}`);
          setLoading(false);
          return;
        }

        const result = await res.json();
        setUserData(result);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  // Check daily upload count on component mount
  useEffect(() => {
    const checkDailyUploads = async () => {
      if (session?.accessToken) {
        try {
          const count = await getTodayUploadCount(session.accessToken);
          setDailyUploadCount(count);
        } catch (error) {
          console.error('Error checking daily uploads:', error);
        }
      }
      setCheckingUploads(false);
    };

    checkDailyUploads();
  }, [session?.accessToken]);

  // Early returns after all hooks have been called
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return null;

  // Check if daily limit is reached
  const isDailyLimitReached = dailyUploadCount !== null && dailyUploadCount >= MAX_DAILY_UPLOADS;

  return (
    <div className="w-full p-2 h-full flex flex-col items-center justify-center">
      <div className="flex flex-col p-4  items-center  w-[90vw] my-4 bg-white md:w-1/2 border rounded border-zinc-400 shadow">
        <h1>Upload Audio</h1>
        {userData.subscription_status !== 'active' && (
          <div className="backdrop-blur-xs absolute flex flex-col items-start justify-start w-full h-full z-10">
            <div className="bg-white self-center mt-12 p-4 shadow text-center">
              <h2 className="font-bold">Audio uploading is available for premium users only.</h2>
              <Link href="/account" className="hover:underline text-blue-600 ">
                Upgrade now
              </Link>
            </div>
          </div>
        )}
        {/* Daily upload count display */}
        {!checkingUploads && dailyUploadCount !== null && (
          <div
            className={`p-1 rounded-md my-1 ${isDailyLimitReached ? 'bg-red-50 border border-red-200' : ''}`}
          >
            <p className={`text-sm ${isDailyLimitReached ? 'text-red-700' : 'text-zinc-500'}`}>
              Daily uploads: {dailyUploadCount} / {MAX_DAILY_UPLOADS}
              {isDailyLimitReached && (
                <span className="block mt-1 font-medium">
                  Daily upload limit reached. Please try again tomorrow.
                </span>
              )}
            </p>
          </div>
        )}

        {checkingUploads && (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md mb-4">
            <p className="text-sm text-gray-600">Checking daily upload count...</p>
          </div>
        )}

        <Formik
          initialValues={{
            file: null as File | null,
            title: '',
            notes: '',
            tags: '',
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

              // Check daily upload limit
              if (dailyUploadCount !== null && dailyUploadCount >= MAX_DAILY_UPLOADS) {
                setMessage(
                  `Daily upload limit reached (${MAX_DAILY_UPLOADS} uploads per day). Please try again tomorrow.`,
                );
                setIsSubmitting(false);
                return;
              }

              const key = await uploadAudioFile(values.file!, session.accessToken);
              await saveRecordingMetadata(
                key,
                {
                  title: values.title,
                  notes: values.notes,
                  tags: values.tags ? values.tags.split(',').map((t) => t.trim()) : [],
                  location: values.location,
                  date: values.date,
                },
                session.accessToken,
              );

              // Update the daily upload count
              setDailyUploadCount((prev) => (prev !== null ? prev + 1 : 1));
              setMessage('Audio uploaded successfully!');
              resetForm();
            } catch (err: unknown) {
              if (err instanceof Error) {
                setMessage('Upload failed: ' + err.message);
              } else {
                setMessage('Upload failed: ' + String(err));
              }
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {(props) => (
            <Form className="flex flex-col gap-2 max-w-md mt-4">
              <label className="flex flex-col m-2 my-4">
                Audio File
                <input
                  className=" file:border file:p-1 file:rounded file:border-blue-700 file:text-blue-700 my-2 cursor-pointer file:cursor-pointer text-zinc-600 "
                  type="file"
                  accept="audio/mpeg,audio/mp3,audio/*"
                  onChange={(e) =>
                    props.setFieldValue(
                      'file',
                      e.currentTarget.files ? e.currentTarget.files[0] : null,
                    )
                  }
                />
                {props.errors.file && props.touched.file && (
                  <div className="text-red-500 text-xs">{props.errors.file as string}</div>
                )}
              </label>
              <InputField
                label="Date"
                name="date"
                type="date"
                error={props.touched.date ? (props.errors.date as string) : undefined}
              />
              <InputField
                label="Title"
                name="title"
                type="text"
                error={props.touched.title ? (props.errors.title as string) : undefined}
              />
              <InputField
                label="Notes"
                name="notes"
                type="text"
                error={props.touched.notes ? (props.errors.notes as string) : undefined}
              />
              <div className="flex flex-col m-2 my-4">
                <label className="flex flex-col w-60 ">
                  Tags
                  <Field
                    as="textarea"
                    className="border border-zinc-400 rounded w-full p-2 text-sm text-blue-700"
                    name="tags"
                    rows={3}
                    maxLength={50}
                    onChange={(e: { target: { value: string } }) => {
                      let value = e.target.value;

                      // Split on whitespace, add # to words missing it
                      value = value
                        .split(/\s+/)
                        .map((w: string) => (w && !w.startsWith('#') ? `#${w}` : w))
                        .join(' ');

                      props.setFieldValue('tags', value);
                    }}
                  />
                </label>
                <p className={`text-sm m-1 ${props.values.tags.length === 0 && 'hidden'}`}>
                  {props.values.tags.length}/50
                </p>
              </div>
              <InputField
                label="Location"
                name="location"
                type="text"
                error={props.touched.location ? (props.errors.location as string) : undefined}
              />

              <ButtonPrimary
                handleClick={() => {}}
                type="submit"
                label={submitting ? 'Uploading...' : 'Upload'}
                disabled={submitting || isDailyLimitReached}
              />
              {message && <div className="mt-2 text-green-600">{message}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
