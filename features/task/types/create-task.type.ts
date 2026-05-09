export interface Task {
  id: string;
  tenantId: string;
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  assignedTo: string | null;
  dueDate: Date | null;
  createdAt: Date;
  deletedAt: Date | null;
}
