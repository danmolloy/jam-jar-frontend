'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get('email');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleResend = async () => {
    if (!username) return;
    setStatus('sending');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/resend-email-confirmation-public/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        },
      );

      if (response.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Confirm Your Email</h1>
      <p className="text-gray-700 mb-6">Please check your email to confirm your account.</p>

      {status === 'sent' && (
        <p className="text-green-600 mb-4">
          If an account exists, a confirmation email has been sent.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mb-4">Something went wrong. Please try again.</p>
      )}

      <div className="flex gap-3">
        {username && (
          <button
            onClick={handleResend}
            disabled={status === 'sending'}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Resend Confirmation Email'}
          </button>
        )}
        <Link
          href="/login"
          className="inline-block bg-gray-200 text-gray-800 rounded px-4 py-2 hover:bg-gray-300"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function CheckEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Confirm Your Email</h1>
          <p className="text-gray-700 mb-6">Loading...</p>
        </div>
      }
    >
      <CheckEmailContent />
    </Suspense>
  );
}
