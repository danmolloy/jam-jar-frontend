'use client';
import { Form, Formik } from 'formik';
import InputField from '../form/inputField';
import UsernameField from '../form/usernameField';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { getApiUrl } from '../../app/lib/api';
import Loading from '@/app/loading';

// Validation schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required')
    .test('username-available', 'Username is already taken', function () {
      // This will be handled by the real-time checking, but we keep it for form validation
      return true;
    }),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  first_name: Yup.string().min(2, 'First name must be at least 2 characters'),
  last_name: Yup.string().min(2, 'Last name must be at least 2 characters'),
});

export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({
    checking: false,
    available: null,
    message: '',
  });

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/register' });
    }
  }, [session?.error]);

  useEffect(() => {
    if (status === 'authenticated' && !session?.error) {
      router.push('/');
    }
  }, [status, router, session?.error]);

  // Debounced username availability check
  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameStatus({
        checking: false,
        available: null,
        message: '',
      });
      return;
    }

    setUsernameStatus((prev) => ({ ...prev, checking: true }));

    try {
      const response = await fetch(
        `${getApiUrl()}api/check-username/?username=${encodeURIComponent(username)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUsernameStatus({
          checking: false,
          available: data.available,
          message: data.message,
        });
      } else {
        setUsernameStatus({
          checking: false,
          available: false,
          message: 'Error checking username availability',
        });
      }
    } catch (err) {
      console.log(err);
      setUsernameStatus({
        checking: false,
        available: false,
        message: 'Network error checking username',
      });
    }
  }, []);

  // Debounce function for username checking
  const debounce = (func: (username: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (username: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(username), delay);
    };
  };

  const debouncedCheckUsername = useCallback(
    debounce((username: string) => checkUsernameAvailability(username), 500),
    [checkUsernameAvailability],
  );

  if (status === 'loading' || status === 'authenticated') {
    return <Loading />;
  }

  const handleRegister = async (values: {
    username: string;
    password: string;
    password_confirm: string;
    email: string;
    first_name: string;
    last_name: string;
  }) => {
    // Check if username is available before submitting
    if (usernameStatus.available === false) {
      setError('Please choose a different username');
      return;
    }

    if (usernameStatus.checking) {
      setError('Please wait while we check username availability');
      return;
    }
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${getApiUrl()}api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, show email confirmation message
        setSuccess(
          data.message ||
            'Account created successfully! Please check your email to confirm your account.',
        );
      } else {
        // Handle registration errors
        if (data.username) {
          setError(data.username[0]);
        } else if (data.email) {
          setError(data.email[0]);
        } else if (data.password) {
          setError(data.password[0]);
        } else if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else {
          setError('Registration failed. Please try again.');
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
    <Formik
      initialValues={{
        username: '',
        password: '',
        password_confirm: '',
        email: '',
        first_name: '',
        last_name: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {(props) => (
        <Form className="flex flex-col p-4 items-center justify-center w-screen min-h-[80vh]  bg-gradient-to-b  from-zinc-50 to-zinc-100">
          <h1>Register</h1>
          <p>
            Already have an account?{' '}
            <Link href="/login" className="hover:underline text-blue-600">
              Login
            </Link>
          </p>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="flex flex-col bg-white items-center border border-zinc-400 rounded shadow p-4 my-4 ">
            <UsernameField
              label="Username"
              name="username"
              error={props.errors.username}
              onUsernameChange={debouncedCheckUsername}
              usernameStatus={usernameStatus}
            />
            <InputField label="Email" name="email" type="email" error={props.errors.email} />
            <InputField
              label="Password"
              name="password"
              type="password"
              error={props.errors.password}
            />
            <InputField
              label="Confirm Password"
              name="password_confirm"
              type="password"
              error={props.errors.password_confirm}
            />
            <InputField
              label="First Name"
              name="first_name"
              type="text"
              error={props.errors.first_name}
            />
            <InputField
              label="Last Name"
              name="last_name"
              type="text"
              error={props.errors.last_name}
            />

            <button
              type="submit"
              className="flex  flex-row items-center hover:underline border bg-dark text-white  p-1 m-2 hover:cursor-pointer rounded"
            >
              <p>{isSubmitting ? 'Creating Account...' : 'Register'}</p>
              <IoIosArrowRoundForward size={24} />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
