'use client';

import { useState } from 'react';

import { Membership } from '../types/onboarding.type';

import WorkspaceList from './WorkspaceList';
import EmptyWorkspace from './EmptyWorkspace';
import CreateWorkspaceForm from './CreateWorkspaceForm';
import Modal from '@/app/components/modal';
import JoinTenant from '@/features/tenant/components/JoinTenant';

interface Props {
  initialTenants: Membership[];
}

export default function OnboardingView({ initialTenants }: Props) {
  const [tenants, setTenants] = useState(initialTenants);
  const handleJoin = () => {
    setOpenModal('JOIN');
  };
  const handleCreate = () => {
    setOpenModal('CREATE');
  };

  const hasTenant = tenants.length > 0;
  const [openModal, setOpenModal] = useState<'JOIN' | 'CREATE' | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-blue-50 dark:from-black dark:via-gray-950 dark:to-slate-900 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div
        className="
      flex flex-col gap-4
      sm:flex-row sm:items-center sm:justify-between
      mb-8
    ">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Workspaces
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and access your team workspace
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCreate}
            className="
          px-4 py-3
          rounded-xl
          bg-linear-to-r from-blue-600 to-indigo-600
          text-white
          text-sm font-medium
          hover:opacity-90
          transition-opacity
          shadow-lg shadow-blue-500/20
          cursor-pointer
        ">
            Create Workspace
          </button>

          <button
            onClick={handleJoin}
            className="
          px-4 py-3
          rounded-xl
          border border-gray-200 dark:border-gray-700
          bg-white/70 dark:bg-gray-900/70
          backdrop-blur
          text-sm font-medium
          text-gray-700 dark:text-gray-300
          hover:bg-gray-50 dark:hover:bg-gray-800
          transition-colors
          cursor-pointer
        ">
            Join Workspace
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {hasTenant ? <WorkspaceList tenants={tenants} /> : <EmptyWorkspace />}
      </div>

      {/* Modal */}
      <Modal isOpen={openModal !== null} onClose={() => setOpenModal(null)}>
        {openModal === 'JOIN' && <JoinTenant />}

        {openModal === 'CREATE' && (
          <CreateWorkspaceForm
            onCreated={(tenant) => {
              setTenants((prev) => [...prev, tenant]);
              setOpenModal(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
