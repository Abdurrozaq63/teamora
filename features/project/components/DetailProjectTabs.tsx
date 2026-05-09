'use client';

import { useState, useEffect } from 'react';

import TaskSection from './TaskSection';

import MemberSection from './MemberSection';
import { Task } from '@/features/task/types/create-task.type';
import { useTaskStore } from '@/features/task/store/useTaskStore';

interface Props {
  tenantId: string;
  projectId: string;
  task: Task[];
}

export default function ProjectTabs({ tenantId, projectId, task }: Props) {
  const [activeTab, setActiveTab] = useState<'TASK' | 'MEMBER'>('TASK');
  const setTasks = useTaskStore((state) => state.setTasks);
  useEffect(() => {
    setTasks(task);
    console.log('task detail project tab', task);
  }, [task, setTasks]);
  return (
    <>
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('TASK')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'TASK'
              ? 'bg-white dark:bg-gray-900 border border-b-0 border-gray-200 dark:border-gray-800 text-black dark:text-white'
              : 'text-gray-500'
          }`}>
          Tasks
        </button>

        <button
          onClick={() => setActiveTab('MEMBER')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === 'MEMBER'
              ? 'bg-white dark:bg-gray-900 border border-b-0 border-gray-200 dark:border-gray-800 text-black dark:text-white'
              : 'text-gray-500'
          }`}>
          Members
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        {activeTab === 'TASK' ? (
          <TaskSection
            tenantId={tenantId}
            projectId={projectId}
            refreshKey={0}
          />
        ) : (
          <MemberSection />
        )}
      </div>
    </>
  );
}
