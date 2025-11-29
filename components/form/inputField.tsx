import { Field } from 'formik';

export default function InputField({
  label,
  name,
  type,
  error,
  min,
  max,
}: {
  name: string;
  label: string;
  type: string;
  error: string | undefined;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col m-2 my-4">
      <label className="flex flex-col w-60 ">
        {label}
        <Field
          min={min}
          max={max}
          name={name}
          type={type}
          className="border border-zinc-400 rounded shadow-xs my-1 p-1"
        />
        {error && <div id="feedback" className='text-red-500 text-xs'>{error}</div>}
      </label>
    </div>
  );
}
