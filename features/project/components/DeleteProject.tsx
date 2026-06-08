'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useDeleteProject } from '../hooks/delete-project.hook';

interface DeleteProjectModalProps {
  tenantId: string;
  projectName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeleteProjectModal({
  tenantId,
  projectName,
  onClose,
  onSuccess,
}: DeleteProjectModalProps) {
  const { deleteProject, loading } = useDeleteProject();

  async function handleDelete() {
    try {
      const res = await deleteProject('', tenantId);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success('Project deleted successfully');

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete project',
      );
    }
  }

  return (
    <div
      className="
        w-full max-w-md
        rounded-3xl
        border border-white/40 dark:border-gray-800
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur-xl
        shadow-xl
        overflow-hidden
      ">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Delete Project
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone.
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        <div className="rounded-2xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            You are about to permanently delete:
          </p>

          <p className="mt-2 font-semibold text-red-600 dark:text-red-400">
            {projectName}
          </p>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            All tasks, members, and project-related data may become inaccessible
            after deletion.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-6 pb-6">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            flex-1
            rounded-xl
            border border-gray-200 dark:border-gray-700
            py-3
            text-sm font-medium
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-800
            transition
            cursor-pointer
          ">
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handleDelete}
          className="
            flex-1
            rounded-xl
            bg-red-600
            py-3
            text-sm font-semibold
            text-white
            hover:bg-red-700
            disabled:opacity-50
            transition
            cursor-pointer
          ">
          {loading ? 'Deleting...' : 'Delete Project'}
        </button>
      </div>
    </div>
  );
}
