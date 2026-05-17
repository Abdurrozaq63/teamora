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
      const res = await fetch('/api/onboarding/create-tenant', {
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
      className="
    w-full max-w-md mx-auto
    rounded-3xl
    border border-white/40 dark:border-gray-800
    bg-white/80 dark:bg-gray-900/80
    backdrop-blur-xl
    shadow-xl shadow-slate-200/50 dark:shadow-black/30
    overflow-hidden
  ">
      {/* Header */}
      <div className="px-6 pt-7 pb-5 border-b border-gray-200 dark:border-gray-800">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Create Workspace
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create a new workspace to collaborate with your team
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-5">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Workspace Name
          </label>

          <input
            type="text"
            placeholder="My Workspace"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* Actions */}
        <div className="space-y-3 pt-2">
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
            {loading ? 'Creating Workspace...' : 'Create Workspace'}
          </button>

          <button
            type="button"
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
            Join Workspace
          </button>
        </div>
      </div>
    </form>
  );
}
