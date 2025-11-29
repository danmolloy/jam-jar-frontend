import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import * as Yup from 'yup';
import InputField from '../form/inputField';
import ButtonPrimary from '../form/buttonPrimary';

export default function UpdateUsername({ username }: { username: string }) {
  const { data: session, update } = useSession();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: username || '',
  };

  const SettingsSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
  });

  const handleSubmit = async (values: { username: string }) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Only include password fields if password is being changed
      const updateData: {
        username: string;
      } = {
        username: values.username,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/users/${session?.user?.id}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(updateData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess('Settings updated successfully!');

        // Update the session if username changed
        if (values.username !== username) {
          await update();
        }
      } else {
        // Handle validation errors
        if (data.username) {
          setError(data.username[0]);
        } else {
          setError('Update failed. Please try again.');
        }
      }
    } catch (err) {
      console.log(err);
      setError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SettingsSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(props) => (
          <Form className="flex flex-col p-4 items-start  justify-between lg:flex-row border-b border-neutral-300">
            <div className="">
              <h1 className="font-medium text-lg mx-2">Update Username</h1>
              <InputField label="" name="username" type="text" error={props.errors.username} />
            </div>
            <div className="lg:self-end">
              <ButtonPrimary
                disabled={isSubmitting}
                type="submit"
                label={isSubmitting ? 'Updating...' : 'Save Changes'}
                handleClick={() => {}}
              />
              {error && <div className="text-red-500 mb-4">{error}</div>}
              {success && <div className="text-green-500 mb-4">{success}</div>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
