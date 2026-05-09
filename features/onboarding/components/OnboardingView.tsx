'use client';

import { useState } from 'react';

import { Membership } from '../types/onboarding.type';

import WorkspaceList from './WorkspaceList';
import EmptyWorkspace from './EmptyWorkspace';
import CreateWorkspaceForm from './CreateWorkspaceForm';

interface Props {
  initialTenants: Membership[];
}

export default function OnboardingView({ initialTenants }: Props) {
  const [tenants, setTenants] = useState(initialTenants);

  const hasTenant = tenants.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-4 sm:p-6 lg:p-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Workspace
        </h1>

        {hasTenant && (
          <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-sm">
            Join Workspace
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LIST */}
        <div className="space-y-4">
          {hasTenant ? <WorkspaceList tenants={tenants} /> : <EmptyWorkspace />}
        </div>

        {/* FORM */}
        {!hasTenant && (
          <div className="flex flex-col justify-center">
            <CreateWorkspaceForm
              onCreated={(tenant) => {
                setTenants((prev) => [...prev, tenant]);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
