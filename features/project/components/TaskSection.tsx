'use client';
import { useEffect } from 'react';
import TaskList from '@/features/task/components/TaskList';
import EditTask from '@/features/task/components/EditTask';
import { useTaskStore } from '@/features/task/store/useTaskStore';

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

  const renderContent = () => {
    switch (activeView) {
      case 'TASKLIST':
        return (
          <TaskList tenantId={tenantId} projectId={projectId} refreshKey={0} />
        );
      case 'EDIT':
        return <EditTask />;

      default:
        return null;
    }
  };
  useEffect(() => {}, [refreshKey]);
  return renderContent();
}
