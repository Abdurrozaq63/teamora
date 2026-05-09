export interface Membership {
  id: string;
  userId: string;
  tenantId: string;
  roleId: string;
  status: string;
  joinedAt: string;

  tenant: {
    id: string;
    name: string;
    inviteCode: string;
    createdAt: string;
    deletedAt: string | null;
  };

  role: {
    id: string;
    name: string;
  };
}
