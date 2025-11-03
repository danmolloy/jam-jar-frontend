'use client';

import { components } from '@/types/api';
import { Field, Formik } from 'formik';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '../form/buttonPrimary';
import { useEffect, useState } from 'react';

type DiaryEntry = components['schemas']['DiaryEntry'];
type UserData = components['schemas']['User'];

export default function CreateDiaryEntry({
  session,
  mode = 'create',
  diaryEntry,
}: {
  session: Session;
  mode: 'create' | 'update';
  diaryEntry?: DiaryEntry | undefined;
}) {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const initialVals = {
    title: mode === 'update' ? diaryEntry!.title : '',
    body: mode === 'update' ? diaryEntry!.body : '',
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) {
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
        setData(result);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  const handleCreate = async (values: { title: string; body: string }) => {
    try {
      const res =
        mode === 'create'
          ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/diary-entries/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
              },
              body: JSON.stringify(values),
            })
          : await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/diary-entries/${diaryEntry!.id}/`, {
              method: 'PATCH', // or PUT
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`,
              },
              body: JSON.stringify(values),
            });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!diaryEntry!.id) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/diary-entries/${diaryEntry!.id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
      } else {
        router.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-4">
      <h1>Create Entry</h1>
      <Formik
        initialValues={initialVals}
        onSubmit={async (values) => {
          await handleCreate(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field
              placeholder="Title"
              className="border-b  my-4 rounded-t p-1"
              type="text"
              name="title"
              error={props.errors.title}
            />
            {/* <InputField label="Body" type="textarea" name="body" error={props.errors.body} /> */}
            <div>
              <Field
                as="textarea"
                className="border rounded w-full p-2 text-sm"
                name="body"
                rows={5}
                maxLength={data.subscription_status !== 'active' ? 40 : 5000}
                placeholder="Write your diary entry..."
              />
              {props.values.body.length < 1 ? null : data.subscription_status !== 'active' ? (
                <p className="text-sm m-2">{props.values.body.length}/40</p>
              ) : (
                <p className="text-sm m-2">{props.values.body.length}/5000</p>
              )}
            </div>
            <ButtonPrimary type="submit" label="Submit" handleClick={() => {}} />
          </form>
        )}
      </Formik>
      {mode === 'update' && (
        <button
          onClick={() => handleDelete()}
          className="w-24 border border-red-500 text-red-500 rounded hover:bg-red-50"
        >
          Delete
        </button>
      )}
    </div>
  );
}
