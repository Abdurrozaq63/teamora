import DetailTaskView from '@/features/task/components/DetailTaskView';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { detailTask } from '@/features/task/services/detail-task.service';
import { assigneed } from '@/features/task/services/assigneed.service';
import { assigneeList } from '@/features/task/services/assignee-list.service';
import { error } from 'console';
interface Props {
  params: Promise<{
    tenantId: string;
    projectId: string;
    taskId: string;
  }>;
}
export default async function DetailTaskPage({ params }: Props) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const userId = session.user.id;
  const { tenantId, projectId, taskId } = await params;

  const [detail, unassignedList, assignedList] = await Promise.all([
    detailTask({ tenantId, projectId, userId, taskId }),
    assigneed({ tenantId, projectId, taskId }),
    assigneeList(taskId),
  ]);

  if (!detail) {
    throw error;
  }

  return (
    <DetailTaskView
      tenantId={tenantId}
      projectId={projectId}
      userId={userId}
      detailTask={detail}
      listAssigneed={unassignedList}
    />
  );
}
