'use client';

import { useState } from 'react';

import { Project } from '../types/project.type';

interface Props {
  tenantId: string;

  onSuccess?: (project: Project) => void;
}

export default function CreateProjectForm({ tenantId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/project/${tenantId}/create-project`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      onSuccess?.(data.project);

      setForm({
        name: '',
        description: '',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm max-w-md">
      <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
        New Project
      </h2>

      <form onSubmit={handleCreate} className="space-y-3">
        <input
          type="text"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 rounded-lg bg-black text-white">
          {loading ? 'Membuat...' : 'Buat Project'}
        </button>
      </form>
    </div>
  );
}
