'use client'

import InputField from "@/components/form/inputField";
import { Form, Formik } from "formik";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import * as Yup from 'yup';

function ResetPasswordContent() {
    const [message, setMessage] = useState('');
    const [submitting, setIsSubmitting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            setIsConfirming(true);
        }
    }, [token]);

    const requestResetSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const confirmResetSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        password_confirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
    });

    const handleRequestReset = async (values: { email: string }) => {
        setMessage('');
        setIsSubmitting(true);
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/password-reset/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.email?.[0] || 'Failed to request password reset');
            } else {
                setMessage("If there's an account linked to that email address, we have sent a password reset link.");
            }
        } catch (err) {
            console.error(err);
            setMessage(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmReset = async (values: { password: string; password_confirm: string }) => {
        setMessage('');
        setIsSubmitting(true);
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/password-reset/confirm/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    password: values.password,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.password?.[0] || errorData.token?.[0] || 'Failed to reset password');
            } else {
                setMessage("Password reset successfully! You can now log in with your new password.");
            }
        } catch (err) {
            console.error(err);
            setMessage(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isConfirming) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md font-mono">
                <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
                {message && (
                    <div className={`mb-4 p-3 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <Formik
                    initialValues={{
                        password: "",
                        password_confirm: ""
                    }}
                    validationSchema={confirmResetSchema}
                    onSubmit={handleConfirmReset}
                >
                    {props => (
                        <Form>
                            <InputField 
                                label="New Password" 
                                type="password" 
                                name="password" 
                                error={props.errors.password} 
                            />
                            <InputField 
                                label="Confirm New Password" 
                                type="password" 
                                name="password_confirm" 
                                error={props.errors.password_confirm} 
                            />
                            <button 
                                type="submit" 
                                disabled={submitting} 
                                className="w-full bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {submitting ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md font-mono">
            <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
            {message && (
                <div className={`mb-4 p-3 rounded ${message.includes('sent') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}
            <Formik
                initialValues={{
                    email: ""
                }}
                validationSchema={requestResetSchema}
                onSubmit={handleRequestReset}
            >
                {props => (
                    <Form>
                        <InputField 
                            label="Email" 
                            type="email" 
                            name="email" 
                            error={props.errors.email} 
                        />
                        <button 
                            type="submit" 
                            disabled={submitting} 
                            className="w-full bg-blue-600 text-white rounded px-4 py-2 mt-4 hover:bg-blue-700 disabled:opacity-50 hover:cursor-pointer"
                        >
                            {submitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default function ResetPassword() {
    return (
        <Suspense fallback={
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Reset Your Password</h1>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}