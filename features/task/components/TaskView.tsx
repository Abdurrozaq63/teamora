'use client';
import { useEffect, useState } from 'react';
import CreateTask from '@/features/task/components/CreateTask';
import Modal from '@/app/components/modal';

const statuses = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
interface Props {
  tenantId: string;
  projectId: string;
  refreshKey: string;
}

export default function TaskSection({
  tenantId,
  projectId,
  refreshKey,
}: Props) {
  useEffect(() => {}, [refreshKey]);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-white">Tasks</h2>

        <button className="px-3 py-1 text-sm rounded bg-black text-white">
          + Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status} className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {status}
            </h3>

            <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
              <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                Sample Task
              </h4>

              <p className="text-xs text-gray-500">Assigned: Ahmad</p>

              <p className="text-xs text-gray-500">Due: 2 days</p>

              <div className="flex gap-2 mt-2">
                <button className="text-xs px-2 py-1 bg-black text-white rounded">
                  View
                </button>
                <button className="text-xs px-2 py-1 border rounded">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CreateTask tenantId={tenantId} projectId={projectId} />
      </Modal>
    </div>
  );
}
