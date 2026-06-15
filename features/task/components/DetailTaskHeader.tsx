'use client';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '../store/useTaskStore';
import Modal from '@/app/components/modal';
import { useState, useEffect } from 'react';
import FormTask from './FormTask';
import DeleteTaskModal from './DeleteTaskModal';

interface Props {
  tenantId: string;
  projectId: string;
  roleProject: 'ADMIN' | 'MEMBER' | undefined;
}

export default function DetailTaskHeader({
  tenantId,
  projectId,
  roleProject,
}: Props) {
  const { detailTask, setDetailTask } = useTaskStore();
  const [taskId, setTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  useEffect(() => {
    if (detailTask) {
      setTaskId(detailTask.id);
      setTaskTitle(detailTask.title);
    }
  }, [detailTask]);
  const router = useRouter();
  const handleBack = () => {
    router.push(`/${tenantId}/projects/${projectId}`);
  };
  const [openModal, setOpenModal] = useState<'EDIT' | 'DELETE' | null>(null);
  return (
    <div
      className="
    mb-6
    flex flex-col gap-5
    lg:flex-row lg:items-center lg:justify-between
  ">
      {/* Left */}
      <div className="min-w-0">
        {/* Back Button */}
        <button
          onClick={() => handleBack()}
          className="
        inline-flex items-center gap-2
        text-sm font-medium
        text-gray-500 dark:text-gray-400
        hover:text-gray-900 dark:hover:text-white
        transition-colors
        cursor-pointer
      ">
          <span>Back to Tasks</span>
        </button>

        {/* Title */}
        <div className="mt-4">
          <h1
            className="
          text-3xl font-bold tracking-tight
          text-gray-900 dark:text-white
        ">
            Task Detail
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            View task information, submissions, and progress
          </p>
        </div>
      </div>

      {/* Actions */}
      {roleProject === 'ADMIN' && (
        <div
          className="
      flex flex-col sm:flex-row
      gap-3
      w-full lg:w-auto
    ">
          {/* Edit */}
          <button
            onClick={() => setOpenModal('EDIT')}
            className="
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white/70 dark:bg-gray-900
        px-5 py-3
        text-sm font-medium
        text-gray-700 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-800
        transition-colors
        cursor-pointer
        w-full sm:w-auto
      ">
            Edit Task
          </button>

          {/* Done */}
          <button
            onClick={() => setOpenModal('DELETE')}
            className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/50 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
            Delete
          </button>
        </div>
      )}
      <Modal isOpen={openModal !== null} onClose={() => setOpenModal(null)}>
        {openModal === 'EDIT' && (
          <FormTask
            tenantId={tenantId}
            projectId={projectId}
            taskId={detailTask?.id}
            mode={'EDIT'}
            onClose={() => setOpenModal(null)}
            onSuccessEdit={(result) => {
              setDetailTask(result);
            }}
          />
        )}
        {openModal === 'DELETE' && (
          <DeleteTaskModal
            tenantId={tenantId}
            projectId={projectId}
            taskId={taskId}
            taskTitle={taskTitle}
            onClose={() => setOpenModal(null)}
            onSuccess={() => {
              setOpenModal(null);
              router.push(`/${tenantId}/projects/${projectId}`);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
