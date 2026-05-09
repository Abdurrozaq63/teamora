export interface ProjectDetail {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  joinedAt: Date;

  project: {
    id: string;
    tenantId: string;
    name: string;
    description: string | null;
    status: string;
    createdBy: string;
    createdAt: Date;
    deletedAt: Date | null;
  };
}
