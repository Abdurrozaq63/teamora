import { Task } from '@/features/task/types/task.type';

export interface Project {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  status: string;
  createdBy: string;
  createdAt: Date;
  deletedAt: Date | null;
  tasks: Task[];
}
