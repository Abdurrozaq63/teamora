import { User } from '@/types/user.type';

export interface taskAssignee {
  id: string;
  taskId: string;
  userId: string;
  assignedAt: Date;
  user: User;
}
