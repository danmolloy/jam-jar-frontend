'use client'
import { Form, Formik } from "formik";
import InputField from "../form/inputField";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io"; 

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session?.error]);

  useEffect(() => {
    if (status === "authenticated" && !session?.error) {
      router.push("/");
    }
  }, [status, router, session?.error]);

  if (status === "loading" || status === "authenticated") {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values) => {
        signIn("credentials", values, { redirectTo: "/" });
      }}
    >
      {(props) => (
        <Form className="flex flex-col p-4 font-mono items-center justify-center">
          <h1>Login</h1>
          <p>Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link></p>
          <InputField label="Username" name="username" type="text" error={props.errors.username}/>
          <InputField label="Password" name="password" type="password" error={props.errors.password}/>
          <button type="submit" className="flex  flex-row items-center hover:underline border p-1 m-2 hover:cursor-pointer rounded">
            <p>Sign in</p>
            <IoIosArrowRoundForward size={24}/>
          </button>
          <Link href="/reset-password" className="hover:underline text-sm text-blue-500 mt-4">Forgot your password?</Link>
        </Form>
      )}
    </Formik>
  );
}