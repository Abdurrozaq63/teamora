'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Register Gagal');
      setLoading(false);
      return;
    }
    router.push('/login?registered=true');
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
                  Create Account
                </h1>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Join and start managing your projects in{' '}
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
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
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

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
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
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
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
              {error && (
                <div
                  className="
                rounded-xl
                border border-red-200 dark:border-red-900/50
                bg-red-50 dark:bg-red-900/10
                px-4 py-3
                text-sm text-red-600 dark:text-red-400
              ">
                  {error}
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
                {loading ? 'Loading...' : 'Daftar'}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Sudah punya akun?{' '}
              <a
                href="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
