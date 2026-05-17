'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../validations/login.schema';

export default function LoginForm() {
  const { login, loading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationError, setValidationError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setValidationError('');

    const validated = loginSchema.safeParse({
      email,
      password,
    });

    if (!validated.success) {
      setValidationError(validated.error.message);

      return;
    }

    await login(email, password);
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 dark:from-black dark:via-gray-950 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="
        rounded-3xl
        border border-white/40 dark:border-gray-800
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        shadow-xl shadow-slate-200/50 dark:shadow-black/30
        overflow-hidden
      ">
          {/* Header */}
          <div className="px-6 pt-8 pb-6 border-b border-gray-200/70 dark:border-gray-800">
            <div className="space-y-3 text-center">
              {/* Logo */}
              <div
                className="
              mx-auto
              flex items-center justify-center
              w-14 h-14
              rounded-2xl
              bg-linear-to-br from-blue-500 to-indigo-600
              text-white
              text-xl font-bold
              shadow-lg shadow-blue-500/20
            ">
                T
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome Back
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Sign in to continue to{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    TeamOra
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                w-full rounded-xl
                border border-gray-200 dark:border-gray-700
                bg-white/70 dark:bg-gray-900
                px-4 py-3
                text-sm text-gray-900 dark:text-white
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-blue-500/40
                focus:border-blue-500
                transition
              "
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                w-full rounded-xl
                border border-gray-200 dark:border-gray-700
                bg-white/70 dark:bg-gray-900
                px-4 py-3
                text-sm text-gray-900 dark:text-white
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-blue-500/40
                focus:border-blue-500
                transition
              "
                />
              </div>

              {/* Error */}
              {(validationError || error) && (
                <div
                  className="
                rounded-xl
                border border-red-200 dark:border-red-900/50
                bg-red-50 dark:bg-red-900/10
                px-4 py-3
                text-sm text-red-600 dark:text-red-400
              ">
                  {validationError || error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
              w-full rounded-xl
              bg-linear-to-r from-blue-600 to-indigo-600
              text-white
              py-3
              text-sm font-semibold
              hover:opacity-90
              disabled:opacity-50
              transition-opacity
              shadow-lg shadow-blue-500/20
              cursor-pointer
            ">
                {loading ? 'Loading...' : 'Masuk'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-3 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/dashboard',
                })
              }
              className="
            w-full rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-white/70 dark:bg-gray-900
            py-3 px-4
            text-sm font-medium
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-800
            transition-colors
            cursor-pointer
          ">
              Login dengan Google
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Belum punya akun?{' '}
              <a
                href="/register"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Daftar
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
