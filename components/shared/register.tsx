'use client'
import { Form, Formik, useFormik } from "formik";
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";

// Validation schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password_confirm: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Please confirm your password"),
  first_name: Yup.string()
    .min(2, "First name must be at least 2 characters"),
  last_name: Yup.string()
    .min(2, "Last name must be at least 2 characters"),
});

export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/register" });
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated" && !session?.error) {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return <div>Loading...</div>;
  }

  const handleRegister = async (values: any) => {
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, sign in the user
        await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });
        
        // Redirect to home page
        router.push("/");
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
          setError("Registration failed. Please try again.");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ 
        username: "", 
        password: "",
        password_confirm: "",
        email: "",
        first_name: "",
        last_name: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
    >
      {(props) => (
        <Form className="flex flex-col p-4 font-mono">
          <h1>Register</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <InputField label="Username" name="username" type="text" error={props.errors.username}/>
          <InputField label="Email" name="email" type="email" error={props.errors.email}/>
          <InputField label="Password" name="password" type="password" error={props.errors.password}/>
          <InputField label="Confirm Password" name="password_confirm" type="password" error={props.errors.password_confirm}/>
          <InputField label="First Name" name="first_name" type="text" error={props.errors.first_name}/>
          <InputField label="Last Name" name="last_name" type="text" error={props.errors.last_name}/>
          <ButtonPrimary 
            type="submit" 
            label={isSubmitting ? "Creating Account..." : "Register"} 
            handleClick={() => {}} 
          />
          <p>Already have an account? <Link href="/login" className="hover:underline">Login</Link></p>
        </Form>
      )}
    </Formik>
  );
}