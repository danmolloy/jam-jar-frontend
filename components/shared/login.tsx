'use client'
import { Form, Formik } from "formik";
import InputField from "../form/inputField";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io"; 

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session?.error]);

  useEffect(() => {
    if (status === "authenticated" && !session?.error) {
      router.push(callbackUrl);
    }
  }, [status, router, session?.error, callbackUrl]);

  // Check for error in URL parameters (from NextAuth)
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'CredentialsSignin') {
      setError('Invalid username or password. Please try again.');
    } else if (errorParam === 'Configuration') {
      setError('Authentication is not properly configured. Please contact support.');
    } else if (errorParam === 'AccessDenied') {
      setError('Access denied. Please check your credentials.');
    } else if (errorParam) {
      setError('An error occurred during login. Please try again.');
    }
  }, [searchParams]);

  if (status === "loading" || status === "authenticated") {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values) => {
        setError(null);
        setIsSubmitting(true);
        
        try {
          const result = await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false,
          });
          
          if (result?.error) {
            if (result.error === 'CredentialsSignin') {
              setError('Invalid username or password. Please try again.');
            } else if (result.error === 'Configuration') {
              setError('Authentication is not properly configured. Please contact support.');
            } else if (result.error === 'AccessDenied') {
              setError('Access denied. Please check your credentials.');
            } else {
              setError('An error occurred during login. Please try again.');
            }
          } else if (result?.ok) {
            router.push(callbackUrl);
          }
        } catch (err) {
          setError('Network error. Please check your connection and try again.');
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {(props) => (
        <Form 
          className="flex flex-col p-4 font-mono items-center justify-center"
          onChange={() => error && setError(null)}
        >
          <h1>Login</h1>
          <p>Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
          
          {error && (
            <div className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}
          
          <InputField 
            label="Username" 
            name="username" 
            type="text" 
            error={props.errors.username}
          />
          <InputField 
            label="Password" 
            name="password" 
            type="password" 
            error={props.errors.password}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex flex-row items-center hover:underline border p-1 m-2 hover:cursor-pointer rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p>{isSubmitting ? "Signing in..." : "Sign in"}</p>
            <IoIosArrowRoundForward size={24}/>
          </button>
          <Link href="/reset-password" className="hover:underline text-sm text-blue-500 mt-4">Forgot your password?</Link>
        </Form>
      )}
    </Formik>
  );
}