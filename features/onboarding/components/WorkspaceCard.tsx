'use client';

import { useRouter } from 'next/navigation';

import { Membership } from '../types/onboarding.type';

interface Props {
  workspace: Membership;
}

export default function WorkspaceCard({ workspace }: Props) {
  const router = useRouter();

  return (
    <div
      key={workspace.tenant.id}
      className="
    rounded-3xl
    border border-white/40 dark:border-gray-800
    bg-white/80 dark:bg-gray-900/80
    backdrop-blur-xl
    shadow-sm hover:shadow-lg
    transition-all
    overflow-hidden
  ">
      {/* Top */}
      <div className="p-5 space-y-4">
        {/* Workspace Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {workspace.tenant.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Team workspace
              </p>
            </div>

            {/* Workspace Avatar */}
            <div
              className="
            w-11 h-11 shrink-0
            rounded-2xl
            bg-linear-to-br from-blue-500 to-indigo-600
            text-white
            flex items-center justify-center
            font-semibold
            shadow-lg shadow-blue-500/20
          ">
              {workspace.tenant.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Invite Code */}
          <div
            className="
          inline-flex items-center
          rounded-full
          bg-gray-100 dark:bg-gray-800
          px-3 py-1
          text-xs font-medium
          text-gray-600 dark:text-gray-300
        ">
            Invite: {workspace.tenant.inviteCode}
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Your Role
          </span>

          <span
            className="
          inline-flex items-center
          rounded-full
          bg-blue-100 dark:bg-blue-900/30
          px-3 py-1
          text-xs font-semibold
          text-blue-700 dark:text-blue-300
        ">
            {workspace.role.name}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
      border-t border-gray-200 dark:border-gray-800
      px-5 py-4
      bg-gray-50/70 dark:bg-gray-900/40
    ">
        <button
          onClick={() => router.push(`/${workspace.tenant.id}`)}
          className="
        w-full
        rounded-xl
        bg-linear-to-r from-blue-600 to-indigo-600
        text-white
        py-3
        text-sm font-semibold
        hover:opacity-90
        transition-opacity
        shadow-lg shadow-blue-500/20
        cursor-pointer
      ">
          Open Workspace
        </button>
      </div>
    </div>
  );
}
