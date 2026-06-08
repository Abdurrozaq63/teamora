'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useUpdateRoleProject } from '../hooks/useUpdateRoleProject';

interface Props {
  memberId: string;

  currentRole: 'ADMIN' | 'MEMBER' | '';
  tenantId: string;
  projectId: string;

  onClose: () => void;

  onSuccess?: (role: 'ADMIN' | 'MEMBER' | '') => void;
}

export default function UpdateMemberRoleModal({
  memberId,
  currentRole,
  tenantId,
  projectId,
  onClose,
  onSuccess,
}: Props) {
  const { updateRole, loading } = useUpdateRoleProject();

  const [role, setRole] = useState<'ADMIN' | 'MEMBER' | ''>(currentRole);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await updateRole(memberId, role, tenantId, projectId);

      toast.success('Role updated successfully');

      onSuccess?.(role);

      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update role',
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/40 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl overflow-hidden">
      {/* Header */}

      <div className="px-6 pt-7 pb-5 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Update Member Role
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Change member permissions within this project
        </p>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'ADMIN' | 'MEMBER')}
            className="
              w-full
              rounded-xl
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900
              px-4 py-3
              text-sm
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/40
            ">
            <option value="ADMIN">ADMIN</option>

            <option value="MEMBER">MEMBER</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              rounded-xl
              border border-gray-200 dark:border-gray-700
              py-3
              text-sm
              font-medium
              cursor-pointer
            ">
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              flex-1
              rounded-xl
              bg-linear-to-r
              from-blue-600
              to-indigo-600
              py-3
              text-sm
              font-semibold
              text-white
              cursor-pointer
              disabled:opacity-50
            ">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
