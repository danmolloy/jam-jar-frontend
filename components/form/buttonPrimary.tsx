
export default function ButtonPrimary({
  label,
  type,
  handleClick,
}: {
  label: string;
  type: "button" | "submit" | "reset" | undefined
  handleClick: () => void
}) {
  return (
    <button className=" rounded p-1 m-2 px-2  text-white hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-sm" type={type} onClick={() => handleClick()}>
      {label}
    </button>
  )
}