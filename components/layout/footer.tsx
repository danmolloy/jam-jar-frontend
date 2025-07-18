import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-sm flex flex-col items-start justify-start w-full  bg-white font-mono text-gray-600 p-4">
  <div className="flex flex-row justify-between  w-full my-4">
    <Link href="/privacy" className="hover:underline">Privacy Policy</Link> 
    <Link href="/terms" className="hover:underline">Terms of Service</Link>
    <Link href="/contact" className="hover:underline">Contact</Link>
  </div>
  <div className="flex flex-row justify-between w-full">
    <p>Operated by Daniel Molloy, Sole Trader, UK</p>
    <p>© 2025 Jam Jar. All rights reserved.</p>

  </div>
</footer>
  )
}