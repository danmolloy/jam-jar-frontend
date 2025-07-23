import { Form, Formik } from "formik";
import InputField from "../form/inputField";
import ButtonPrimary from "../form/buttonPrimary";
import * as Yup from 'yup';
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UpdateDailyTarget({dailyTarget}: {
  dailyTarget: number|undefined
}) {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
  
    daily_target: dailyTarget === undefined ? 0 : dailyTarget,
   
  }

  const SettingsSchema = Yup.object().shape({
    daily_target: Yup.number().max(500).min(5).optional(),
  })

  const handleSubmit = async (values: {
    daily_target: number
   
  }) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      // Only include password fields if password is being changed
      const updateData: {
        daily_target: number
      } = {
        daily_target: values.daily_target
      };


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users/${session?.user?.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(updateData),
      });

      await response.json();

      if (response.ok) {
        setSuccess("Settings updated successfully!");
        
  
        

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
            <h1>Daily Target</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <InputField label="Daily Target (mins)" name="daily_target" type="number" error={props.errors.daily_target} />
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