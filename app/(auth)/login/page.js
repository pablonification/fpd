'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An expected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#DFF5F8] to-white">
      <div className="flex w-[500px] flex-col items-center justify-start gap-6 rounded-[36px] bg-white/80 p-11 shadow-[0px_0px_32px_0px_rgba(0,0,0,0.07)] outline outline-1 outline-offset-[-1px] outline-zinc-300 backdrop-blur-lg">
        {/* Header */}
        <div className="flex flex-col items-center justify-start gap-4 self-stretch">
          <div className="h-7 w-7 bg-zinc-300" />
          <div className="flex flex-col items-center justify-start gap-3 self-stretch">
            <div className="text-center text-2xl leading-8 font-medium text-black">
              Welcome Back
            </div>
            <p className="text-center text-sm text-gray-500">
              Please enter your admin credentials
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          {/* Email */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="text-base leading-5 font-medium text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-Primary600 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base leading-5 text-black outline-none focus:ring-2"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="text-base leading-5 font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-Primary600 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base leading-5 text-black outline-none focus:ring-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            <div className="mt-1 text-sm leading-4 font-normal text-neutral-500">
              Forgot password?{' '}
              <Link
                href="/forgot-password"
                className="cursor-pointer underline"
              >
                Click here
              </Link>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-[#2AB2C7] px-6 py-3 text-base font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
