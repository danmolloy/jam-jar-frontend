'use client'

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ConfirmEmailContent() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No confirmation token found. Please check your email for the correct link.');
            return;
        }

        const confirmEmail = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/confirm-email/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Email confirmed successfully!');
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Failed to confirm email. Please try again.');
                }
            } catch (error) {
                console.log(error)
                setStatus('error');
                setMessage('An error occurred while confirming your email. Please try again.');
            }
        };

        confirmEmail();
    }, [token]);

    const handleResend = async () => {
        setStatus('loading');
        setMessage('Sending confirmation email...');
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/resend-email-confirmation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Confirmation email sent successfully!');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to send confirmation email.');
            }
        } catch (error) {
            console.log(error)

            setStatus('error');
            setMessage('An error occurred while sending the confirmation email.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Confirm Your Email</h1>
            
            {status === 'loading' && (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Confirming your email...</p>
                </div>
            )}
            
            {status === 'success' && (
                <div className="text-center">
                    <div className="text-green-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-green-700 mb-4">{message}</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            )}
            
            {status === 'error' && (
                <div className="text-center">
                    <div className="text-red-600 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className="text-red-700 mb-4">{message}</p>
                    <div className="space-y-2">
                        <button
                            onClick={handleResend}
                            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 mr-2"
                        >
                            Resend Confirmation Email
                        </button>
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ConfirmEmail() {
    return (
        <Suspense fallback={
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Confirm Your Email</h1>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <ConfirmEmailContent />
        </Suspense>
    );
} 