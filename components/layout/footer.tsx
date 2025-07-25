import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-sm flex flex-col items-start justify-start w-full  bg-black font-mono text-white p-8">
  <div className="flex flex-col justify-between  w-full ">
    <Link href="/privacy" className="hover:underline">Privacy Policy</Link> 
    <Link href="/terms" className="hover:underline">Terms of Service</Link>
  </div>
  <div className="flex flex-col md:flex-row justify-between w-full">
    <p>Operated by Daniel Molloy, Sole Trader, UK</p>
    <p>© 2025 Jam Jar. All rights reserved.</p>

  </div>
</footer>
  )
}