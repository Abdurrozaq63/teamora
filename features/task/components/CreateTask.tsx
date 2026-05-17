'use client';
import { useState } from 'react';
import { Task } from '../types/task.type';

type CreateTaskProps = {
  tenantId: string;
  projectId: string;
  onSuccess?: (task: Task) => void;
};
export default function CreateTask({
  tenantId,
  projectId,
  onSuccess,
}: CreateTaskProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const addTask = await fetch(
      `/api/project/${tenantId}/${projectId}/create-task`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      },
    );
    if (!addTask.ok) {
      console.error('failed create task');
      return;
    }
    const data = await addTask.json();
    if (addTask.ok) {
      setLoading(false);
      onSuccess?.(data.task);
    }
  }
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/40 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create New Task
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add a new task for your project team
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCreate} className="p-5 sm:p-6 space-y-5">
        {/* Title */}
        <div className="space-y-2">
          <label
            className="
          text-sm font-medium
          text-gray-700 dark:text-gray-300
        ">
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title..."
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="
          w-full
          rounded-2xl
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
          <label
            className="
          text-sm font-medium
          text-gray-700 dark:text-gray-300
        ">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Write task description..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="
          w-full
          rounded-2xl
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="
          flex-1
          rounded-2xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          px-5 py-3
          text-sm font-semibold text-white
          shadow-lg shadow-blue-500/20
          hover:opacity-90
          transition-opacity
          disabled:opacity-50
          cursor-pointer
        ">
            {loading ? 'Creating Task...' : 'Create Task'}
          </button>

          <button
            type="button"
            className="
          rounded-2xl
          border border-gray-200 dark:border-gray-700
          bg-white/70 dark:bg-gray-900
          px-5 py-3
          text-sm font-medium
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-800
          transition-colors
          cursor-pointer
        ">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
