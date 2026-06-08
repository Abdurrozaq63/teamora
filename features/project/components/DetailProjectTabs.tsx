'use client';

import { useState, useEffect } from 'react';

import TaskSection from './TaskSection';

import { Task } from '@/features/task/types/task.type';
import { useTaskStore } from '@/features/task/store/useTaskStore';
import { useProjectStore } from '../store/useProjectStore';
import { MemberProject } from '../types/member-project.type';
import MemberView from './MemberView';
import { UnmemberProject } from '../types/unmember-project.type';

interface Props {
  tenantId: string;
  projectId: string;
  memberProject: MemberProject[];
  task: Task[];
  unmemberProjects: UnmemberProject[];
}

export default function ProjectTabs({
  tenantId,
  projectId,
  memberProject,
  task,
  unmemberProjects,
}: Props) {
  const [activeTab, setActiveTab] = useState<'TASK' | 'MEMBER'>('TASK');
  const setTasks = useTaskStore((state) => state.setTasks);
  const { setMemberProjects, setUnmemberProjects, setTenantId } =
    useProjectStore();
  useEffect(() => {
    setTasks(task);
    setMemberProjects(memberProject);
    setUnmemberProjects(unmemberProjects);
    setTenantId(tenantId);
  }, [task, setTasks, memberProject, unmemberProjects, tenantId]);
  return (
    <>
      {/* Tab Navigation */}
      <div
        className="
      rounded-3xl
      border border-white/40 dark:border-gray-800
      bg-white/80 dark:bg-gray-900/80
    
      shadow-sm
      p-2
      flex gap-2
    ">
        {/* TASK TAB */}
        <button
          onClick={() => setActiveTab('TASK')}
          className={`
        flex-1
        rounded-2xl
        px-4 py-3
        text-sm font-semibold
        transition-all
        cursor-pointer
        ${
          activeTab === 'TASK'
            ? `
              bg-linear-to-r from-blue-600 to-indigo-600
              text-white
              shadow-lg shadow-blue-500/20
            `
            : `
              text-gray-600 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-gray-800
            `
        }
      `}>
          Tasks
        </button>

        {/* MEMBER TAB */}
        <button
          onClick={() => setActiveTab('MEMBER')}
          className={`
        flex-1
        rounded-2xl
        px-4 py-3
        text-sm font-semibold
        transition-all
        cursor-pointer
        ${
          activeTab === 'MEMBER'
            ? `
              bg-linear-to-r from-blue-600 to-indigo-600
              text-white
              shadow-lg shadow-blue-500/20
            `
            : `
              text-gray-600 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-gray-800
            `
        }
      `}>
          Members
        </button>
      </div>

      {/* Content */}
      <div
        className="
      mt-5
      rounded-3xl
      border border-white/40 dark:border-gray-800
      bg-white/80 dark:bg-gray-900/80
      
      shadow-sm
      p-5
    ">
        {activeTab === 'TASK' ? (
          <TaskSection
            tenantId={tenantId}
            projectId={projectId}
            refreshKey={0}
          />
        ) : (
          <MemberView />
        )}
      </div>
    </>
  );
}
