import { User } from '@/types/user.type';

export interface Membership {
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
