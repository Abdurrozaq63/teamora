'use client';
import { useState } from 'react';
import { Task } from '../types/create-task.type';

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
    const addTask = await fetch(`/api/project/${tenantId}/${projectId}/task`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
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
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm max-w-md">
      <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
        New Task
      </h2>

      <form onSubmit={handleCreate} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
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
