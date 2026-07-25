import { User } from '@/types/user.type';

export interface AuditLog {
  id: string;
  tenantId: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: Date;
  user: User;
}
