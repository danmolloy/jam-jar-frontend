'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ManageSubscription() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleManageSubscription = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}payments/create-portal-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      });

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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Subscription</h2>
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      <button
        onClick={handleManageSubscription}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Manage Billing'}
      </button>
      <p className="text-sm text-gray-600 mt-2">
        Update payment methods, view invoices, and manage your subscription.
      </p>
    </div>
  );
} 