'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Membership = {
  id: string;
  userId: string;
  tenantId: string;
  roleId: string;
  status: string;
  joinedAt: string;
  tenant: {
    id: string;
    name: string;
    inviteCode: string;
    createdAt: string;
    deletedAt: string | null;
  };
  role: {
    id: string;
    name: string;
  };
};

export default function OnboardingPage() {
  const router = useRouter();
  const [listTenant, setListTenant] = useState<Membership[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListTenant();
  }, []);

  async function getListTenant() {
    const res = await fetch('/api/dashboard/getListTenant');
    const result = await res.json();
    setListTenant(result);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/onboarding/create-tenant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
    } else {
      setName('');
      getListTenant(); // refresh setelah create
    }
  }

  const hasTenant = listTenant.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-4 sm:p-6 lg:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Workspace
        </h1>

        {/* tombol kanan atas (hanya kalau SUDAH punya tenant) */}
        {hasTenant && (
          <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-sm">
            Join Workspace
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LIST TENANT */}
        <div className="space-y-4">
          {hasTenant ? (
            listTenant.map((lt) => (
              <div
                key={lt.id}
                className="p-4 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {lt.tenant.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Invite: {lt.tenant.inviteCode}
                </p>

                <p className="text-sm text-gray-500">Role: {lt.role.name}</p>

                <button
                  onClick={() => router.push(`/${lt.tenant.id}`)}
                  className="mt-3 px-4 py-2 text-sm rounded-lg bg-black text-white">
                  Masuk Workspace
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
              Kamu belum punya workspace
            </div>
          )}
        </div>

        {/* FORM (hanya jika BELUM punya tenant) */}
        {!hasTenant && (
          <div className="flex flex-col justify-center">
            <form
              onSubmit={handleCreate}
              className="w-full max-w-md mx-auto space-y-4 p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 shadow">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Buat Workspace Baru
              </h2>

              <input
                type="text"
                placeholder="Nama Workspace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 rounded-lg bg-black text-white">
                {loading ? 'Membuat...' : 'Buat Workspace'}
              </button>

              <button
                type="button"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700">
                Join Workspace
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
