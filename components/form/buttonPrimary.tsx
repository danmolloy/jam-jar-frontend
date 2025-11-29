export default function ButtonPrimary({
  label,
  type,
  handleClick,
  disabled,
}: {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  handleClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      className="disabled:opacity-50 rounded p-1 m-2 px-2  text-white hover:underline cursor-pointer bg-blue-600 hover:bg-blue-700 text-sm"
      type={type}
      onClick={() => handleClick()}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
