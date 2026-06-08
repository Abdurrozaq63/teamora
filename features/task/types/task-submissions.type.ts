export interface TaskSubmissions {
  id: string;
  taskId: string;
  content: string | null;
  fileUrl: string | null;
  submittedBy: string;
  createdAt: Date;
}
