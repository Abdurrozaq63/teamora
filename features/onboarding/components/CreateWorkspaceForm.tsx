'use client';

import { useState } from 'react';

interface Props {
  onCreated: (tenant: any) => void;
}

export default function CreateWorkspaceForm({ onCreated }: Props) {
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('/api/onboarding/create-workspace', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      onCreated({
        tenant: {
          id: data.tenantId,
          name,
          inviteCode: '-',
        },

        role: {
          name: 'OWNER',
        },
      });

      setName('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}
