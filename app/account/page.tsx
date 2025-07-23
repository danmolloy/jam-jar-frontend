'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const ProductDisplay = ({ onCheckout, loading }: { onCheckout: () => void, loading: boolean }) => (
  <section>
    <div className="product">
      <div className="description">
        <h3>Starter plan</h3>
        <h5>£11.99 / 3 months</h5>
      </div>
    </div>
    <button
      id="checkout-and-portal-button"
      onClick={onCheckout}
      disabled={loading}
    >
      {loading ? "Redirecting..." : "Checkout"}
    </button>
  </section>
);

const SuccessDisplay = ({ sessionId }: {
  sessionId: string
}) => (
  <section>
    <div className="product Box-root">
      <div className="description Box-root">
        <h3>Subscription to starter plan successful!</h3>
      </div>
    </div>
    <form action="/create-portal-session" method="POST">
      <input
        type="hidden"
        id="session-id"
        name="session_id"
        value={sessionId}
      />
      <button id="checkout-and-portal-button" type="submit">
        Manage your billing information
      </button>
    </form>
  </section>
);

const Message = ({ message, onRetry }: {
  message: string
  onRetry?: () => void
}) => (
  <section className="text-center">
    <p className="mb-4">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Try Again
      </button>
    )}
  </section>
);

export default function Premium() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Check for session_id in URL and confirm subscription
  useEffect(() => {
    const url = new URL(window.location.href);
    const session_id = url.searchParams.get('session_id');
    if (session_id && session?.accessToken) {
      setSessionId(session_id);
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}payments/confirm-subscription/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ session_id }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSuccess(true);
            setMessage('Subscription confirmed!');
          } else {
            // Clear the invalid session_id from URL
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('session_id');
            window.history.replaceState({}, '', newUrl.toString());
            setMessage(data.error || 'Failed to confirm subscription. Please try again.');
          }
        })
        .catch(() => {
          // Clear the invalid session_id from URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('session_id');
          window.history.replaceState({}, '', newUrl.toString());
          setMessage('Network error. Please try again.');
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage('');
    try {
      console.log('Creating checkout session...');
      const res = await fetch('/api/subscriptions/create-checkout-session/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.accessToken && { Authorization: `Bearer ${session.accessToken}` }),
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      console.log('Checkout session response:', data);
      
      if (data.sessionId) {
        console.log('Loading Stripe...');
        const stripe = await stripePromise;
        if (stripe) {
          console.log('Redirecting to checkout with session ID:', data.sessionId);
          const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
          if (result.error) {
            console.error('Stripe redirect error:', result.error);
            setMessage(result.error.message!);
          }
          // No need to set success here; Stripe will redirect if successful
        } else {
          setMessage("Stripe.js failed to load.");
        }
      } else {
        setMessage(data.error || "Failed to create checkout session.");
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!success && message === '') {
    return <ProductDisplay onCheckout={handleCheckout} loading={loading} />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} onRetry={message.includes('Failed to confirm') ? handleCheckout : undefined} />;
  }
}