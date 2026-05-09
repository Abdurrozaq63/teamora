'use client';

import { useRouter } from 'next/navigation';

import { Membership } from '../types/onboarding.type';

interface Props {
  workspace: Membership;
}

export default function WorkspaceCard({ workspace }: Props) {
  const router = useRouter();

  return (
    <div className="p-4 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
        {workspace.tenant.name}
      </h2>

      <p className="text-sm text-gray-500">
        Invite: {workspace.tenant.inviteCode}
      </p>

      <p className="text-sm text-gray-500">Role: {workspace.role.name}</p>

      <button
        onClick={() => router.push(`/${workspace.tenant.id}`)}
        className="mt-3 px-4 py-2 text-sm rounded-lg cursor-pointer bg-black text-white">
        Masuk Workspace
      </button>
    </div>
  );
}
