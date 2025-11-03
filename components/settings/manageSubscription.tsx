'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ManageSubscription() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleManageSubscription = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}payments/create-portal-session/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe Customer Portal
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to create portal session');
      }
    } catch (err) {
      console.error('Error creating portal session:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 items-start  justify-between lg:flex-row border-b border-neutral-300">
      <div className="mx-2">
        <h2 className="font-medium text-lg">Manage Subscription</h2>
        <p className="">Update payment methods, view invoices, and manage your subscription.</p>
      </div>
      <div>
        <button
          onClick={handleManageSubscription}
          disabled={loading}
          className="rounded p-1 m-2 px-2  text-white hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Manage Billing'}
        </button>
        {error && <div className="text-red-500 mb-4">{error}</div>}
      </div>
    </div>
  );
}
