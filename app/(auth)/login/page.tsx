'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      window.location.href = '/dashboard';
    }
  }

  return (
    <main className="min-h-screen flex flex-col from-white to-slate-100">
      {/* Header */}
      {/* <header className="w-full px-8 py-4 flex justify-between items-center shadow-sm bg-white">
                <h1 className="text-2xl font-bold text-sky-600">KOSIN</h1>
                <nav className="flex gap-4">
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-lg text-sky-600 font-medium hover:bg-sky-50 transition">
                    Beranda
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition">
                    Masuk
                  </Link>
                </nav>
              </header> */}

      {/* Form */}
      <div className="w-full m-auto max-w-md bg-white rounded-2xl border shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-center text-slate-800 mb-6">
          Masuk ke <span className="text-blue-600">KOSIN</span>
        </h1>
        {/* {error && (
                  <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )} */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Masuk
          </button>
        </form>
        <button onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
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
