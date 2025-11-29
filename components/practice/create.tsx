'use client';
import { Field, Formik } from 'formik';
import { Session } from 'next-auth';
import InputField from '../form/inputField';
import ButtonPrimary from '../form/buttonPrimary';
import { PracticeItem } from './detailView';
import { useRouter } from 'next/navigation';
import { authenticatedFetch } from '../../app/lib/api';
import * as Yup from 'yup'
import { useState } from 'react';

export default function CreateSession({
  session,
  mode = 'create',
  practiceItem,
}: {
  session: Session;
  mode: 'create' | 'update';
  practiceItem?: PracticeItem & { tags: string[] };
}) {
  const router = useRouter();
      const [isSubmitting, setIsSubmitting] = useState(false);
  

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

  const initialVals =
    mode === 'create'
      ? {
          activity: '',
          notes: '',
          duration: 0,
          tags: '',
          rating: 1,
          date: formatDateForInput(new Date()),
        }
      : {
          activity: practiceItem!.activity ? practiceItem!.activity : '',
          notes: practiceItem!.notes ? practiceItem!.notes : '',
          duration: practiceItem!.duration ? practiceItem!.duration : 0,
          tags: practiceItem!.tags.join(" ") ? practiceItem!.tags.join(" ") : '',
          rating: practiceItem!.rating ? practiceItem!.rating : 3,
          date: formatDateForInput(practiceItem!.date || new Date()),
        };

  const validationSchema = Yup.object().shape({
    activity: Yup.string().required(),
    notes: Yup.string(),
    duration: Yup.number().required(),
    tags: Yup.string(),
    date: Yup.string().required()
  })

  const handleCreate = async (values: {
    activity: string;
    notes: string;
    rating: number;
    tags: string[];
    duration: number;
    date: string;
  }) => {
    values.tags = values.tags.filter((tag) => tag.length > 0);

    // Ensure date is in the correct format for the backend
    const submissionData = {
      ...values,
      date: values.date, // Already in YYYY-MM-DD format from the input
    };

    try {
      const url =
        mode === 'create'
          ? `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/`
          : `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${practiceItem!.id}/`;

      const method = mode === 'create' ? 'POST' : 'PATCH';

      const res = await authenticatedFetch(
        url,
        {
          method,
          body: JSON.stringify(submissionData),
        },
        session,
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      // Show user-friendly error message
      if (err instanceof Error && err.message.includes('Token expired')) {
        alert('Your session has expired. Please refresh the page and try again.');
      } else {
        alert('Failed to save practice item. Please try again.');
      }
    }
  };

  const handleDelete = async () => {
    if (!practiceItem!.id) {
      return;
    }

    try {
            setIsSubmitting(true);

      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/practice-items/${practiceItem!.id}/`,
        { method: 'DELETE' },
        session,
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Submission failed: ${JSON.stringify(errorData)}`);
      } else {
        router.push('/');
      }
    } catch (e) {
      console.log(e);
      if (e instanceof Error && e.message.includes('Token expired')) {
        alert('Your session has expired. Please refresh the page and try again.');
      } else {
        alert('Failed to delete practice item. Please try again.');
      }
    } finally {
            setIsSubmitting(false);

    }
  };

  return (
    <div className="flex flex-col p-4  items-center w-[90vw] my-4 bg-white md:w-1/2 border rounded border-zinc-400 shadow">
      <h1>{mode === 'create' ? 'Log' : 'Update'} Practice</h1>
      <Formik
        initialValues={initialVals}
        onSubmit={async (values) => {
          await handleCreate({
            ...values, 
            tags: values.tags.split(' ').filter(i => i.length > 0).map(i => i.slice(1))
          });
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputField label="Date" type="date" name="date" error={props.errors.date} />
            <InputField
              label="Activity"
              type="text"
              name="activity"
              error={props.errors.activity}
            />
            <div className="flex flex-col m-2 my-4">
      <label className="flex flex-col w-60 ">
        Notes

            <Field
                as="textarea"
                className="border  border-zinc-400 rounded w-full p-2 text-sm"
                name="notes"
                rows={3}
                maxLength={50}
                />
                </label>
                <p className={`text-sm m-1 ${props.values.notes.length === 0 && "hidden"}`}>{props.values.notes.length}/50</p>
                        {props.errors.notes && <div id="feedback" className='text-red-500 text-xs'>{props.errors.notes}</div>}

                </div>
            <InputField
              error={props.errors.duration}
              label="Duration"
              name={`duration`}
              type="number"
              min={1}
              max={180}
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
                onChange={(e: { target: { value: string; }; }) => {
        let value = e.target.value;

        // Split on whitespace, add # to words missing it
        value = value
          .split(/\s+/)
          .map((w: string) => w && !w.startsWith("#") ? `#${w}` : w)
          .join(" ");

        props.setFieldValue("tags", value);
      }}
                />
        </label>
                        <p className={`text-sm m-1 ${props.values.tags.length === 0 && "hidden"}`}>{props.values.tags.length}/50</p>

            </div>
            <ButtonPrimary disabled={isSubmitting} type="submit" label={isSubmitting?"Submitting":"Submit"} handleClick={() => {}} />
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
