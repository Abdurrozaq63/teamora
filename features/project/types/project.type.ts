export interface Project {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: string;
  deletedAt: string | null;
}
