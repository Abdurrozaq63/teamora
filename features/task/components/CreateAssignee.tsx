'use client';
import { useTaskStore } from '../store/useTaskStore';
import { useCreateAssignee } from '../hooks/create-assignee.hook';
import { useState } from 'react';
import { taskAssignee } from '../types/task-assignees.type';

interface Props {
  tenantId: string;
  projectId: string;
  onSuccess?: (assignee: taskAssignee) => void;
}
export default function CreateAssignee({
  tenantId,
  projectId,
  onSuccess,
}: Props) {
  const { assigneedTask, removeAssigneed, detailTask } = useTaskStore();
  const { createAssignee, loading } = useCreateAssignee({
    tenantId,
    projectId,
  });
  if (!detailTask) {
    return <div>Loading . . .</div>;
  }
  const handleAdd = async (userId: string) => {
    const x = await createAssignee(detailTask.id, userId);
    if (!x) {
      return console.log('gagal menambakan assigned', x);
    }
    onSuccess?.(x);
    removeAssigneed(userId);
  };
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Member Project
        </h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Assign members to task
        </p>
      </div>

      {/* Table Header - Desktop */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
        <span>User</span>
        <span>Email</span>
        <span>Role</span>
        <span>Joined</span>
        <span className="text-center">Action</span>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {assigneedTask.map((x, index) => {
          const roleColor =
            x.role === 'ADMIN' ? 'bg-blue-500' : 'bg-emerald-500';

          const roleBadge =
            x.role === 'ADMIN'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';

          return (
            <div
              key={index}
              className="
            flex flex-col gap-3 p-4
            md:grid md:grid-cols-5 md:gap-4 md:items-center
            hover:bg-gray-50 dark:hover:bg-gray-800/40
            transition-colors
          ">
              {/* User */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full ${roleColor} text-white flex items-center justify-center font-semibold shrink-0`}>
                  {x.user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col min-w-0">
                  {/* Mobile Label */}
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                    User
                  </span>

                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {x.user.name}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                  Email
                </span>

                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {x.user.email}
                </span>
              </div>

              {/* Role */}
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden mb-1">
                  Role
                </span>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${roleBadge}`}>
                    {x.role}
                  </span>
                </div>
              </div>

              {/* Joined */}
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                  Joined
                </span>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(x.joinedAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end md:justify-center">
                <button
                  onClick={() => handleAdd(x.userId)}
                  disabled={loading}
                  className="w-9 h-9 cursor-pointer rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-transform">
                  +
                </button>
                {loading && <p>Loading...</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
