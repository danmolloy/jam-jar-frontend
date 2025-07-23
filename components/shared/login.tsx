'use client'
import { Form, Formik } from "formik";
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

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
        <Form className="flex flex-col p-4">
          <h1>Login</h1>
          <InputField label="Username" name="username" type="text" error={props.errors.username}/>
          <InputField label="Password" name="password" type="password" error={props.errors.password}/>
          <ButtonPrimary type="submit" label="Sign In" handleClick={() => {}} />
          <Link href="/reset-password" className="hover:underline text-blue-500">Forgot your password?</Link>
          <p>Don&apos;t have an account? <Link href="/register">Register</Link></p>
        </Form>
      )}
    </Formik>
  );
}