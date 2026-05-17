import { User } from '@/types/user.type';

export interface UnmemberProject {
  id: string;
  userId: string;
  tenantId: string;
  roleId: string;
  status: string;
  joinedAt: Date;
  user: User;
  role: {
    id: string;
    name: string;
  };
}
