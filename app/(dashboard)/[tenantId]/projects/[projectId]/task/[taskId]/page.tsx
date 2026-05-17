import DetailTaskView from '@/features/task/components/DetailTaskView';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { detailTask } from '@/features/task/services/detail-task.service';
import { assigneed } from '@/features/task/services/assigneed.service';
import { assigneeList } from '@/features/task/services/assignee-list.service';
interface Props {
  params: Promise<{
    tenantId: string;
    projectId: string;
    taskId: string;
  }>;
}
export default async function DetailTask({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const userId = session.user.id;
  const { tenantId, projectId, taskId } = await params;
  const detail = await detailTask({ tenantId, projectId, userId, taskId });
  const listUnassigneed = await assigneed({ tenantId, projectId, taskId });
  const listAssigneed = await assigneeList(taskId);
  console.log('detail', detail);
  if (!detailTask) return <div>Loading . . .</div>;

  return (
    <>
      <DetailTaskView
        tenantId={tenantId}
        projectId={projectId}
        userId={userId}
        detailTask={detail}
        listAssigneed={listUnassigneed}
      />
    </>
  );
}
