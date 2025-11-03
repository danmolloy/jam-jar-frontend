'use client'
import { useConsent } from "@/lib/useConsent";
import Link from "next/link";

export default function Footer() {
    const { resetConsent } = useConsent()
  

  const handleReset = () => {
    resetConsent()
    window.location.reload()
    
  }

  return (
    <footer className=" text-sm flex flex-col items-start justify-start w-full  bg-dark font-mono text-white p-8 py-16">
  <div className="flex flex-col justify-between items-start w-full text-xs py-2">
    <Link href="/privacy" className="hover:underline ">Privacy Policy</Link> 
    <Link href="/terms" className="hover:underline ">Terms of Service</Link>
    <button onClick={() => handleReset()} className="hover:underline text-start cursor-pointer">Reset Cookies Consent</button>
  </div>
  <div className="flex flex-col md:flex-row justify-between w-full text-xs">
    <p>Operated by Daniel Molloy, Sole Trader, UK</p>
    <p>© 2025 Jam Jar. All rights reserved.</p>

  </div>
</footer>
  )
}