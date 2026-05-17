export interface Membership {
  id: string;
  userId: string;
  tenantId: string;
  roleId: string;
  status: string;
  joinedAt: Date;

  tenant: {
    id: string;
    name: string;
    inviteCode: string;
    createdAt: Date;
    deletedAt: Date | null;
  };

  role: {
    id: string;
    name: string;
  };
}
