export interface Project {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  status: string;
  createdBy: string;
  createdAt: Date;
  deletedAt: Date | null;
}
