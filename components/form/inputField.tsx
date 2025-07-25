import { Field } from "formik";

export default function InputField({
  label,
  name,
  type,
  error,
  min,
  max
}: {
  name: string;
  label: string;
  type: string;
  error: string|undefined;
  min?: number
  max?: number
}) {
  return (
    <div className="flex flex-col m-2 my-4">
      <label className="flex flex-col w-60 font">
        {label}
      <Field min={min} max={max} name={name} type={type} className="border rounded my-2 p-1"/>
      {error && <div id="feedback">{error}</div>}
      </label>
    </div>
  )
}