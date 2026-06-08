import { taskAssignee } from './task-assignees.type';
import { TaskSubmissions } from './task-submissions.type';
export interface DetailTaskProps {
  id: string;
  tenantId: string;
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: Date | null;
  createdAt: Date;
  deletedAt: Date | null;
  messageReview: string | null;
  taskAssignees: taskAssignee[];
  taskSubmissions: TaskSubmissions[];
}
