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
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-6">
          Masuk ke <span className="text-blue-600">KOSIN</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
          />

          {validationError && (
            <p className="text-sm text-red-500">{validationError}</p>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50">
            {loading ? 'Loading...' : 'Masuk'}
          </button>
        </form>

        <button
          onClick={() =>
            signIn('google', {
              callbackUrl: '/dashboard',
            })
          }
          className="w-full mt-4 border rounded-lg py-2 hover:bg-gray-100">
          Login dengan Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{' '}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium">
            Daftar
          </a>
        </p>
      </div>
    </main>
  );
}
