'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function DeleteAccount() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/delete-account/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Account deleted successfully, sign out and redirect
        await signOut({ callbackUrl: '/' });
      } else {
        setError(data.error || 'Failed to delete account');
      }
    } catch (err) {
      console.error('Error deleting account:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="p-4 border  bg-red-50 ">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Confirm Account Deletion</h2>
        <p className="text-red-700 mb-4">
          This action cannot be undone. All your data including audio recordings, practice sessions,
          goals, and diary entries will be permanently deleted.
        </p>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="flex space-x-4">
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Yes, Delete My Account'}
          </button>
          <button
            onClick={() => setShowConfirmation(false)}
            disabled={loading}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4   bg-red-50 flex flex-col lg:flex-row items-start  justify-between">
      <div className="mx-2">
        <h2 className="font-medium text-lg text-red-800 mb-4">Delete Account</h2>
        <p className="text-red-800 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
      </div>
      <button
        onClick={() => setShowConfirmation(true)}
        className="rounded p-1 m-2 px-2 lg:self-end text-white hover:cursor-pointer bg-red-600 hover:bg-red-500 text-sm mt-4"
      >
        Delete Account
      </button>
    </div>
  );
}
