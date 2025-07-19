import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from 'yup';
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";

export default function UpdateEmail({email}: {
    email: string|undefined
}) {
  const { data: session, update } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: email ? email : ""
  }

  const SettingsSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  })

  const handleSubmit = async (values: {
    email: string
  }) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      // Only include password fields if password is being changed
      const updateData: {
    email: string
      } = {
        email: values.email,
      };
      

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
        
        
        // Update the session if username changed
        if (values.email !== email) {
          await update();
        }
      } else {
        // Handle validation errors
      
          setError("Update failed. Please try again.");
        
      }
    } catch (err) {
      console.log(err)
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
            <h1>Update Email</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <InputField label="Email" name="email" type="email" error={props.errors.email} />
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