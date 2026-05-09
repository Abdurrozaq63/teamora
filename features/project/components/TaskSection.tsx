'use client';
import { useEffect, useState } from 'react';
import TaskList from '@/features/task/components/TaskList';
import DetailTask from '@/features/task/components/DetailTask';
import EditTask from '@/features/task/components/EditTask';
import { useTaskStore } from '@/features/task/store/useTaskStore';
import { Task } from '@/features/task/types/create-task.type';
interface Props {
  refreshKey: number;
  tenantId: string;
  projectId: string;
}

export default function TaskSection({
  refreshKey,
  tenantId,
  projectId,
}: Props) {
  const activeView = useTaskStore((state) => state.activeView);

  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);

  const setActiveView = useTaskStore((state) => state.setActiveView);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    setActiveView('DETAILTASK');
  };
  const renderContent = () => {
    switch (activeView) {
      case 'TASKLIST':
        return (
          <TaskList tenantId={tenantId} projectId={projectId} refreshKey={0} />
        );

      case 'DETAILTASK':
        return <DetailTask />;

      case 'EDIT':
        return <EditTask />;

      default:
        return null;
    }
  };
  useEffect(() => {}, [refreshKey]);
  return <div className="space-y-4">{renderContent()}</div>;
}
