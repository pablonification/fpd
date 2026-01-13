'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CgSpinner } from 'react-icons/cg';
import toast from 'react-hot-toast';

export default function ForgotPassPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      toast.success('Password reset link sent!');
      setSubmitted(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4 md:bg-gradient-to-b md:from-[#DFF5F8] md:to-white">
      <div className="flex w-full max-w-[480px] flex-col items-center justify-start gap-6 rounded-[36px] bg-white p-8 shadow-2xl md:p-12 outline outline-1 outline-offset-[-1px] outline-zinc-200">
        {/* Header */}
        <div className="flex flex-col items-center justify-start gap-4 self-stretch">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#2AB2C7]/10 p-4">
            <Image
              src="/icon/keys.webp"
              alt="Forgot Password"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center justify-start gap-2 self-stretch text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
              Forgot Password?
            </h1>
            <p className="max-w-[300px] text-sm font-normal text-zinc-500 md:text-base">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-start justify-start gap-6 self-stretch">
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-[#2AB2C7] focus:ring-4 focus:ring-[#2AB2C7]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center rounded-2xl bg-[#2AB2C7] px-6 py-3.5 text-lg font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? <CgSpinner className="h-6 w-6 animate-spin text-white" /> : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="flex w-full flex-col gap-6 text-center">
            <div className="rounded-2xl bg-teal-50 p-6 border border-teal-100">
              <p className="text-teal-800 font-medium">Reset link sent! Please check your email inbox and spam folder.</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[#2AB2C7] font-semibold hover:underline"
            >
              Try different email
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-2 flex w-full justify-center">
          <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#2AB2C7] transition-colors">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
