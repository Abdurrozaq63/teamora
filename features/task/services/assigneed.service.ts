import { assigneeList } from './assignee-list.service';
import { memberProjectList } from '@/features/project/services/member-list.service';
import { taskAssignee } from '../types/task-assignees.type';
import { UnassigneeTask } from '../types/task-unassignee.type';

interface Props {
  tenantId: string;
  projectId: string;
  taskId: string;
}
export async function assigneed({ tenantId, projectId, taskId }: Props) {
  const taskAssignees = await assigneeList(taskId);

  const projectMembers = await memberProjectList({
    tenantId,
    projectId,
  });

  const assignedUserIds = new Set(
    taskAssignees.map((assignee) => assignee.userId),
  );

  return projectMembers.filter((member) => !assignedUserIds.has(member.userId));
}
// export async function assigneed({ tenantId, projectId, taskId }: Props) {
//   const listAssigne = await assigneeList(taskId);
//   const listProject: UnassigneeTask[] = await memberProjectList({
//     tenantId,
//     projectId,
//   });
//   console.log('user yang mengerjakan task', listAssigne);
//   console.log('member projek', listProject);
//   const assigneedList = new Set(listAssigne.map((x: taskAssignee) => x.id));

//   const hasil = listProject.filter((x) => !assigneedList.has(x.id));
//   console.log('member projek yang belum terdaftar dalam task', hasil);

//   return hasil;
// }
