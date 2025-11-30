'use client'

import { useConsent } from "@/lib/useConsent";

export default function CookiesReset() {
  const { resetConsent } = useConsent();
  
    const handleReset = () => {
      resetConsent();
      window.location.reload();
    };
  return (
    <button onClick={() => handleReset()} className="hover:underline text-start cursor-pointer">
          Reset Cookies Consent
        </button>
  )
}