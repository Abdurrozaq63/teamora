import { useState } from 'react';

interface Props {
  tenantId: string;
  projectId: string;
  taskId: string;
  form?: {
    title: string;
    description: string;
    dueDate: string;
  };
  message?: string;
}
export function useUpdateTask() {
  const [loading, setLoading] = useState(false);

  async function updateMessageReview({
    tenantId,
    projectId,
    taskId,
    message,
  }: Props) {
    try {
      setLoading(true);
      const updateMessage = await fetch(
        `/api/project/${tenantId}/${projectId}/${taskId}/messageReview`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message),
        },
      );

      return updateMessage;
    } finally {
      setLoading(false);
    }
  }
  return { updateMessageReview, loading };
}
