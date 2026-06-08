'use client';
import Modal from '@/app/components/modal';
import { useTaskStore } from '../store/useTaskStore';
import TaskSubmission from './TaskSubmission';
import { useState } from 'react';
import CreateAssignee from './CreateAssignee';
interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
  roleProject: 'ADMIN' | 'MEMBER' | undefined;
}
export default function DetailTask({
  tenantId,
  projectId,
  userId,
  roleProject,
}: Props) {
  const { detailTask } = useTaskStore();

  const handleAdd = () => {
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  if (!detailTask) {
    return <div>Loading . . .</div>;
  }
  return (
    <div className="lg:col-span-3 space-y-5">
      {/* Task Detail Card */}
      <div
        className="
      rounded-3xl
      border border-white/40 dark:border-gray-800
      bg-white/80 dark:bg-gray-900/80
      backdrop-blur-xl
      shadow-sm
      overflow-hidden
    ">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800">
          <div
            className="
          flex flex-col gap-4
          sm:flex-row sm:items-start sm:justify-between
        ">
            {/* Title */}
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="
                w-12 h-12 shrink-0
                rounded-2xl
                bg-linear-to-br from-blue-500 to-indigo-600
                text-white
                flex items-center justify-center
                font-bold
                shadow-lg shadow-blue-500/20
              ">
                  {detailTask.title?.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h2
                    className="
                  text-xl sm:text-2xl
                  font-bold tracking-tight
                  text-gray-900 dark:text-white
                  wrap-break-words
                ">
                    {detailTask.title}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Task detail and activity
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <span
                className={`
              inline-flex items-center
              rounded-full
              px-3 py-1.5
              text-xs font-semibold
              ${
                detailTask.status === 'TODO'
                  ? 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  : detailTask.status === 'IN_PROGRESS'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : detailTask.status === 'REVIEW'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              }
            `}>
                {detailTask.status}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div
              className="
            rounded-2xl
            bg-gray-50 dark:bg-gray-800/60
            px-4 py-4
          ">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Due Date
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {detailTask.dueDate
                  ? new Date(detailTask.dueDate).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'No due date'}
              </p>
            </div>

            {/* Created At */}
            <div
              className="
            rounded-2xl
            bg-gray-50 dark:bg-gray-800/60
            px-4 py-4
          ">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Created At
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                {new Date(detailTask.createdAt).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Description */}
          {detailTask.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>

              <div
                className="
              rounded-2xl
              bg-gray-50 dark:bg-gray-800/60
              px-4 py-4
            ">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {detailTask.description}
                </p>
              </div>
            </div>
          )}

          {/* Assignees */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Assignees
              </h3>

              {roleProject === 'ADMIN' && (
                <button
                  onClick={handleAdd}
                  className="
              inline-flex items-center gap-2
              rounded-xl
              bg-linear-to-r from-blue-600 to-indigo-600
              px-4 py-2
              text-xs font-semibold text-white
              shadow-lg shadow-blue-500/20
              hover:opacity-90
              transition-opacity
              cursor-pointer
            ">
                  <span className="text-sm">+</span>

                  <span>Add Member</span>
                </button>
              )}
            </div>

            {/* Assignee List */}
            <div className="flex flex-wrap gap-3">
              {detailTask.taskAssignees.map((x, index) => (
                <div
                  key={index}
                  className="
                  flex items-center gap-3
                  rounded-2xl
                  border border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-900
                  px-3 py-2
                  shadow-sm
                ">
                  {/* Avatar */}
                  <div
                    className="
                    w-9 h-9
                    rounded-full
                    bg-linear-to-br from-blue-500 to-indigo-600
                    text-white
                    flex items-center justify-center
                    text-sm font-semibold
                    shrink-0
                  ">
                    {x.user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {x.user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submission */}
      <TaskSubmission
        submitted={detailTask.taskSubmissions}
        submittedBy={detailTask.taskAssignees}
      />

      {/* Modal */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CreateAssignee tenantId={tenantId} projectId={projectId} />
      </Modal>
    </div>
  );
}
