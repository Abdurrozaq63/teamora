'use client';
import { useEffect, useState } from 'react';
import FormTask from '@/features/task/components/FormTask';
import { useTaskStore } from '../store/useTaskStore';
import { useProjectStore } from '@/features/project/store/useProjectStore';
import Modal from '@/app/components/modal';
import { Task } from '../types/task.type';
import { useRouter } from 'next/navigation';

const statuses = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
interface Props {
  refreshKey: number;
  tenantId: string;
  projectId: string;
}
export default function TaskList({ refreshKey, tenantId, projectId }: Props) {
  const router = useRouter();
  const tasks = useTaskStore((state) => state.tasks);
  const setTask = useTaskStore((state) => state.setTask);
  const { roleProject } = useProjectStore();

  const handleClickView = (taskId: string) => {
    router.push(`/${tenantId}/projects/${projectId}/task/${taskId}`);
  };

  useEffect(() => {}, [refreshKey]);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-4">
      <div
        className="
    flex flex-col gap-4
    sm:flex-row sm:items-center sm:justify-between
  ">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tasks
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all project tasks
          </p>
        </div>

        {/* Action */}
        {roleProject === 'ADMIN' && (
          <button
            onClick={() => setOpenModal(true)}
            className="flex justify-center items-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all cursor-pointer w-full sm:w-auto">
            {/* <span className="text-base leading-none">+</span> */}
            <span className="p-0">Create Task</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status);

          return (
            <div key={status} className="space-y-4 min-w-0">
              {/* Column Header */}
              <div
                className={`
      flex items-center justify-between
      px-4 py-3 rounded-2xl border
      ${
        status === 'TODO'
          ? 'bg-slate-100 border-slate-200 dark:bg-slate-900/30 dark:border-slate-800'
          : status === 'IN_PROGRESS'
            ? 'bg-blue-100 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
            : status === 'REVIEW'
              ? 'bg-amber-100 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
              : 'bg-emerald-100 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800'
      }
    `}>
                <div className="flex items-center gap-2">
                  {/* Status Dot */}
                  <div
                    className={`
          w-2.5 h-2.5 rounded-full
          ${
            status === 'TODO'
              ? 'bg-slate-500'
              : status === 'IN_PROGRESS'
                ? 'bg-blue-500'
                : status === 'REVIEW'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
          }
        `}
                  />

                  {/* Status Text */}
                  <h3
                    className={`
          text-sm font-semibold
          ${
            status === 'TODO'
              ? 'text-slate-700 dark:text-slate-300'
              : status === 'IN_PROGRESS'
                ? 'text-blue-700 dark:text-blue-300'
                : status === 'REVIEW'
                  ? 'text-amber-700 dark:text-amber-300'
                  : 'text-emerald-700 dark:text-emerald-300'
          }
        `}>
                    {status.replace('_', ' ')}
                  </h3>
                </div>

                {/* Task Count */}
                <span
                  className={`
        text-xs font-medium px-2.5 py-1 rounded-full
        ${
          status === 'TODO'
            ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            : status === 'IN_PROGRESS'
              ? 'bg-blue-200 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300'
              : status === 'REVIEW'
                ? 'bg-amber-200 text-amber-700 dark:bg-amber-800/50 dark:text-amber-300'
                : 'bg-emerald-200 text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300'
        }
      `}>
                  {filteredTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="
            rounded-2xl border border-gray-200 dark:border-gray-800
            bg-white dark:bg-gray-900
            p-4
            hover:border-gray-300 dark:hover:border-gray-700
            hover:bg-gray-50 dark:hover:bg-gray-800/40
            transition-colors
          ">
                      {/* Top */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {task.title}
                        </h4>

                        {/* Due Date */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Due</span>

                          <span>
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString(
                                  'id-ID',
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  },
                                )
                              : 'No due date'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleClickView(task.id)}
                          className="
                flex-1 px-3 py-2
                rounded-xl
                bg-gray-900 dark:bg-white
                text-white dark:text-black
                text-xs font-medium
                hover:opacity-90
                transition-opacity
                cursor-pointer
              ">
                          View
                        </button>

                        {/* <button
                          className="
                flex-1 px-3 py-2
                rounded-xl
                border border-gray-200 dark:border-gray-700
                text-xs font-medium
                text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-gray-800
                transition-colors
                cursor-pointer
              ">
                          Edit
                        </button> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="
          rounded-2xl border border-dashed
          border-gray-200 dark:border-gray-800
          px-4 py-8
          text-center
          text-sm text-gray-400
          bg-gray-50/50 dark:bg-gray-900/30
        ">
                    No task available
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <FormTask
          tenantId={tenantId}
          projectId={projectId}
          mode={'CREATE'}
          onClose={() => setOpenModal(false)}
          onSuccessCreate={(task) => {
            setTask(task);
            setOpenModal(false);
          }}
        />
      </Modal>
    </div>
  );
}
