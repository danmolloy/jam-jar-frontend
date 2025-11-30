'use client'

import { useConsent } from "@/lib/useConsent";

export default function CookiesReset() {
  const { resetConsent } = useConsent();
  
    const handleReset = () => {
      resetConsent();
      window.location.reload();
    };
  return (
    <button aria-label="Reset Cookies Consent" onClick={() => handleReset()} className="hover:underline text-start cursor-pointer p-1">
          Reset Cookies Consent
        </button>
  )
}