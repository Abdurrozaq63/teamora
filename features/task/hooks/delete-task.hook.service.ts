import { useState } from 'react';

interface Props {
  tenantId: string;
  projectId: string;
  taskId: string;
}

export function useDeleteTask() {
  const [loading, setLoading] = useState(false);

  async function deleteTask({ tenantId, projectId, taskId }: Props) {
    try {
      setLoading(true);
      const deleted = await fetch(
        `/api/project/${tenantId}/${projectId}/${taskId}/`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return deleted;
    } finally {
      setLoading(false);
    }
  }
  return { deleteTask, loading };
}
