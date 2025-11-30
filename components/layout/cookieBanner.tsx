'use client';
import { useConsent } from '@/lib/useConsent';

export default function CookieBanner() {
  const { accept, decline } = useConsent();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="text-sm text-gray-700 mb-2 md:mb-0">
        We use cookies to improve your experience and analyze usage. You can opt out of analytics.
      </p>
      <div className="flex gap-2">
        <button
          aria-label='Accept optional cookies'
          onClick={() => {
            accept();
          }}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:underline cursor-pointer"
        >
          Accept
        </button>
        <button
                  aria-label='Decline optional cookies'

          onClick={() => {
            decline();
          }}
          className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded hover:underline cursor-pointer"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
