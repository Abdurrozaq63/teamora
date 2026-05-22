import { assigneeList } from './assignee-list.service';
import { memberProjectList } from '@/features/project/services/member-list.service';
import {taskAssignee} from '../types/task-assignees.type'

interface Props {
  tenantId: string;
  projectId: string;
  taskId: string;
}
export async function assigneed({ tenantId, projectId, taskId }: Props) {
  const listAssigne = await assigneeList(taskId);
  const listProject = await memberProjectList({ tenantId, projectId });

  const assigneedList = new Set(listAssigne.map((x: taskAssignee) => x.id));

  const hasil = listProject.filter((x) => !assigneedList.has(x.id));
  console.log('assigneed', hasil);

  return hasil;
}
