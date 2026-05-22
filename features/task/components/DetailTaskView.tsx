'use client';
import { UnassigneeTask } from '../types/task-unassignee.type';
import DetailTask from './DetailTask';
import DetailTaskHeader from './DetailTaskHeader';
import SubmissionForm from './SubmissionForm';
import { useTaskStore } from '../store/useTaskStore';
import { useEffect } from 'react';
import { taskAssignee } from '../types/task-assignees.type';
import { DetailTaskProps } from '../types/detail-task.type';

interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
  detailTask: DetailTaskProps;
  listAssigneed: UnassigneeTask[];
}

export default function DetailTaskView({
  tenantId,
  projectId,
  userId,
  detailTask,
  listAssigneed,
}: Props) {
  const { setAssigneedTask, setDetailTask } = useTaskStore();
  useEffect(() => {
    setAssigneedTask(listAssigneed);
    setDetailTask(detailTask);
  }, [listAssigneed, detailTask]);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-2 py-3 sm:px-6 lg:px-3">
      <div className="mx-auto max-w-6xl">
        <DetailTaskHeader tenantId={tenantId} projectId={projectId} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <DetailTask
            tenantId={tenantId}
            projectId={projectId}
            userId={userId}
          />

          {/* RIGHT — Submission form */}
          <SubmissionForm />
        </div>
      </div>
    </div>
  );
}
