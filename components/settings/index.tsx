'use client'
import { Form, Formik } from "formik"
import InputField from "../form/inputField"
import ButtonPrimary from "../form/buttonPrimary"
import * as Yup from "yup";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SettingsIndex({user}: {
    user: {
      username: string
    }
}) {
  const { data: session, update } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: user.username || "",
    daily_target: 0,
    current_password: "",
    new_password: "",
    new_password_confirm: "",
  }

  const SettingsSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    daily_target: Yup.number().max(500).min(5).optional(),
    current_password: Yup.string()
    .when('new_password', {
        is: (password_confirm: string) => password_confirm && password_confirm.length > 0,
        then: (schema) => schema.required("Current Password is required when changing password"),
        otherwise: (schema) => schema.optional()}),
    new_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .optional()
      /* .when('password_confirm', {
        is: (password_confirm: string) => password_confirm && password_confirm.length > 0,
        then: (schema) => schema.required("Password is required when confirming"),
        otherwise: (schema) => schema.optional(),
      }) */,
    new_password_confirm: Yup.string()
      .oneOf([Yup.ref('new_password')], "Passwords must match")
      .when('new_password', {
        is: (password: string) => password && password.length > 0,
        then: (schema) => schema.required("Please confirm your password"),
        otherwise: (schema) => schema.optional(),
      }),
  })

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      // Only include password fields if password is being changed
      const updateData: any = {
        username: values.username,
        daily_target: values.daily_target >= 5 ? values.daily_target : 0
      };
      
      if (values.current_password && values.new_password && values.new_password_confirm) {
        updateData.current_password = values.current_password
        updateData.new_password = values.new_password;
        updateData.new_password_confirm = values.new_password_confirm;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users/${session?.user?.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Settings updated successfully!");
        
        // Clear password fields after successful update
        if (values.new_password) {
          values.current_password = "";
          values.new_password = "";
          values.new_password_confirm = "";
        }
        
        // Update the session if username changed
        if (values.username !== user.username) {
          await update();
        }
      } else {
        // Handle validation errors
        if (data.username) {
          setError(data.username[0]);
        } else if (data.password) {
          setError(data.password[0]);
        } else if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else {
          setError("Update failed. Please try again.");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SettingsSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(props) => (
          <Form className="flex flex-col p-4 font-mono">
            <h1>Settings</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <InputField label="Daily Target (mins)" name="daily_target" type="number" error={props.errors.daily_target} />
            <InputField label="Username" name="username" type="text" error={props.errors.username}/>
            <InputField label="Current Password" name="current_password" type="password" error={props.errors.current_password}/>
            <InputField label="New Password" name="new_password" type="password" error={props.errors.new_password}/>
            <InputField label="Confirm New Password" name="new_password_confirm" type="password" error={props.errors.new_password_confirm}/>
            <ButtonPrimary 
              type="submit" 
              label={isSubmitting ? "Updating..." : "Save Changes"} 
              handleClick={() => {}} 
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}