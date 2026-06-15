'use client';
import { useEffect, useState } from 'react';
import { Task } from '../types/task.type';
import { useTaskStore } from '../store/useTaskStore';
import { DetailTaskProps } from '../types/detail-task.type';

type CreateTaskProps = {
  tenantId: string;
  projectId: string;
  taskId?: string;

  mode: 'EDIT' | 'CREATE';
  onClose: () => void;
  onSuccessCreate?: (task: Task) => void;
  onSuccessEdit?: (task: DetailTaskProps) => void;
};
type formTask = {
  title: string;
  description: string;
  dueDate: string;
};
export default function FormTask({
  tenantId,
  projectId,
  taskId,
  mode,
  onClose,
  onSuccessCreate,
  onSuccessEdit,
}: CreateTaskProps) {
  const { detailTask } = useTaskStore();

  const [form, setForm] = useState<formTask>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
  });
  useEffect(() => {
    if (mode === 'EDIT' && detailTask) {
      setForm({
        title: detailTask.title,
        description: detailTask.description ?? '',
        dueDate: detailTask?.dueDate
          ? new Date(detailTask.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [detailTask, mode]);

  const actionButton = mode === 'CREATE' ? ' Create Task' : 'Save Update';

  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const url =
      mode === 'CREATE'
        ? `/api/project/${tenantId}/${projectId}/task`
        : `/api/project/${tenantId}/${projectId}/${taskId}`;
    const methods = mode === 'CREATE' ? 'POST' : 'PUT';
    const addTask = await fetch(url, {
      method: methods,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!addTask.ok) {
      console.error('failed create task');
      setLoading(false);
      return;
    }
    const data = await addTask.json();
    if (addTask.ok) {
      setLoading(false);
      if (mode === 'CREATE') {
        onSuccessCreate?.(data.task);
      }
      if (mode === 'EDIT') {
        onSuccessEdit?.(data);
      }
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
          <input
            type="date"
            placeholder="Enter due date..."
            value={form.dueDate}
            onClick={(e) => {
              (e.currentTarget as HTMLInputElement).showPicker?.();
            }}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="
          flex-1
          rounded-2xl
          bg-linear-to-r from-blue-600 to-indigo-600
          px-5 py-3
          text-sm font-semibold text-white
          shadow-lg shadow-blue-500/20
          hover:opacity-90
          transition-opacity
          disabled:opacity-50
          cursor-pointer
        ">
            {loading ? 'Loading...' : actionButton}
          </button>

          <button
            onClick={onClose}
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
