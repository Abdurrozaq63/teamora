'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUpdateMemberTenant } from '../hooks/update-member.hook';

interface Props {
  memberId: string;
  tenantId: string;
  roleName: string;
  status: string;
  onClose: () => void;
  onSuccess?: (newRole: string, newStatus: string, roleId: string) => void;
}

export default function UpdateMemberTenant({
  memberId,
  tenantId,
  roleName,
  status,
  onClose,
  onSuccess,
}: Props) {
  const { update, loading } = useUpdateMemberTenant();

  const [newRoleName, setNewRoleName] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (roleName && status) {
      setNewRoleName(roleName);
      setNewStatus(status);
    }
  }, [roleName, status]);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await update({
        memberId,
        tenantId,
        roleName: newRoleName,
        status: newStatus,
      });

      toast.success('Update Successfully');
      onSuccess?.(newRoleName, newStatus, res.roleId);
      onClose();
    } catch (error) {
      toast.error('Failed to update');
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
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
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

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
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
            <option value="ACTIVE">ACTIVE</option>

            <option value="SUSPENDED">SUSPENDED</option>
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
