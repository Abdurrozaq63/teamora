import { User } from '@/types/user.type';

export interface MemberProject {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  joinedAt: Date;
  user: User;
}
