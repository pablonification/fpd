'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CgSpinner } from 'react-icons/cg';
import toast from 'react-hot-toast';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [invalidToken, setInvalidToken] = useState(false);

    useEffect(() => {
        if (!token) {
            setInvalidToken(true);
            setVerifying(false);
            return;
        }
        setVerifying(false);
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to reset password');

            toast.success('Password reset successful! You can now login.');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="flex flex-col items-center gap-4">
                <CgSpinner className="h-10 w-10 animate-spin text-[#2AB2C7]" />
                <p className="text-zinc-500 font-medium">Verifying reset link...</p>
            </div>
        );
    }

    if (invalidToken) {
        return (
            <div className="flex flex-col items-center gap-6 text-center">
                <div className="rounded-full bg-red-50 p-4 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-zinc-900">Invalid or Expired Link</h2>
                <p className="text-zinc-500 max-w-[300px]">This password reset link is invalid or has already expired.</p>
                <Link href="/forgot-password" title="Go to Forgot Password" className="rounded-xl bg-[#2AB2C7] px-6 py-3 font-bold text-white shadow-lg shadow-[#2AB2C7]/20 transition hover:opacity-90">
                    Request New Link
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 self-stretch">
            <div className="flex flex-col gap-1 self-stretch">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Set New Password</h2>
                <p className="text-sm font-normal text-zinc-500">Choose a strong password for your account.</p>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-zinc-700">New Password</label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-all focus:border-[#2AB2C7] focus:ring-4 focus:ring-[#2AB2C7]/10"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-zinc-700">Confirm Password</label>
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-all focus:border-[#2AB2C7] focus:ring-4 focus:ring-[#2AB2C7]/10"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center rounded-2xl bg-[#2AB2C7] px-6 py-3.5 text-lg font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
            >
                {loading ? <CgSpinner className="h-6 w-6 animate-spin text-white" /> : 'Reset Password'}
            </button>

            <div className="text-center">
                <Link href="/login" className="text-sm font-medium text-zinc-500 hover:text-[#2AB2C7] transition-colors">
                    Cancel and Back to Login
                </Link>
            </div>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4 md:bg-gradient-to-b md:from-[#DFF5F8] md:to-white">
            <div className="flex w-full max-w-[480px] flex-col items-center justify-start gap-8 rounded-[36px] bg-white p-8 shadow-2xl md:p-12 outline outline-1 outline-offset-[-1px] outline-zinc-200">
                <div className="h-16 w-16 items-center justify-center rounded-2xl bg-[#2AB2C7]/10 p-3 hidden md:flex">
                    <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
                </div>

                <Suspense fallback={<CgSpinner className="h-10 w-10 animate-spin text-[#2AB2C7]" />}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
