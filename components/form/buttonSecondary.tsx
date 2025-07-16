
export default function ButtonSecondary({
  label,
  type,
  handleClick,
}: {
  label: string;
  type: "button" | "submit" | "reset" | undefined
  handleClick: () => void
}) {
  return (
    <button className="border rounded p-1 m-2 px-2 border-blue-500 text-blue-500 hover:cursor-pointer hover:bg-blue-50" type={type} onClick={() => handleClick()}>
      {label}
    </button>
  )
}