import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
export default function MemberSection() {
  const { memberProjects } = useProjectStore();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        {/* Header Desktop */}
        <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Joined</span>
          <span>Action</span>
        </div>

        {/* Content */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {memberProjects.map((mp, index) => {
            const roleColor =
              mp.role === 'ADMIN' ? 'bg-blue-500' : 'bg-emerald-500';

            const roleBadge =
              mp.role === 'ADMIN'
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
                    {mp.user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col min-w-0">
                    {/* Mobile Label */}
                    <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                      Name
                    </span>

                    <span className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {mp.user.name}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                    Email
                  </span>

                  <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {mp.user.email}
                  </span>
                </div>

                {/* Role */}
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden mb-1">
                    Role
                  </span>

                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${roleBadge}`}>
                      {mp.role}
                    </span>
                  </div>
                </div>

                {/* Joined */}
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                    Joined
                  </span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(mp.joinedAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Action */}
                <div className="flex gap-2 justify-end md:justify-start">
                  <div className=" bg-amber-500 hover:bg-amber-600 rounded-lg px-3 py-2">
                    <button className=" text-white text-sm font-medium transition-colors">
                      Update
                    </button>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                    <button className=" text-white text-sm font-medium transition-colors">
                      Out
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
