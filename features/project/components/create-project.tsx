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
    <div
      className="
    w-full max-w-md
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
            Create Project
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start organizing tasks and collaborate with your team
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCreate} className="p-6 space-y-5">
        {/* Project Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Name
          </label>

          <input
            type="text"
            placeholder="Website Redesign"
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

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>

          <textarea
            placeholder="Write short project description..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            rows={4}
            className="
          w-full rounded-xl
          border border-gray-200 dark:border-gray-700
          bg-white/70 dark:bg-gray-900
          px-4 py-3
          text-sm text-gray-900 dark:text-white
          placeholder:text-gray-400
          resize-none
          focus:outline-none
          focus:ring-2 focus:ring-blue-500/40
          focus:border-blue-500
          transition
        "
          />
        </div>

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
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
