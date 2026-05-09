'use client';
import { useEffect, useState } from 'react';
import CreateTask from '@/features/task/components/CreateTask';
import { useTaskStore } from '../store/useTaskStore';
import Modal from '@/app/components/modal';
import { Task } from '../types/create-task.type';

const statuses = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
interface Props {
  refreshKey: number;
  tenantId: string;
  projectId: string;
}
export default function TaskList({ refreshKey, tenantId, projectId }: Props) {
  const tasks = useTaskStore((state) => state.tasks);
  const setTask = useTaskStore((state) => state.setTask);
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const setActiveView = useTaskStore((state) => state.setActiveView);
  const handleClickView = (task: Task) => {
    setSelectedTask(task);
    setActiveView('DETAILTASK');
  };
  useEffect(() => {}, [refreshKey]);
  console.log('task list', tasks);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-white">Tasks</h2>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm rounded bg-black cursor-pointer text-white">
          + Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => {
          const filteredTasks = tasks.filter((task) => task.status === status);

          return (
            <div key={status} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {status}
              </h3>

              <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                        {task.title}
                      </h4>

                      <p className="text-xs text-gray-500">
                        Assigned: {task.assignedTo ?? 'Unassigned'}
                      </p>

                      <p className="text-xs text-gray-500">
                        Due:{' '}
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : 'No due date'}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleClickView(task)}
                          className="text-xs px-2 py-1 bg-black text-white rounded">
                          View
                        </button>

                        <button className="text-xs px-2 py-1 border rounded">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400">No task</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CreateTask
          tenantId={tenantId}
          projectId={projectId}
          onSuccess={(task) => {
            setTask(task);
            setOpenModal(false);
          }}
        />
      </Modal>
    </div>
  );
}
