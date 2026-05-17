import { useState } from 'react';

interface Props {
  tenantId: string;
  projectId: string;
}
export function useCreateAssignee({ tenantId, projectId }: Props) {
  const [loading, setLoading] = useState(false);

  async function createAssignee(taskId: string, userId: string) {
    try {
      setLoading(true);
      const add_Assignee = await fetch(
        `/api/project/${tenantId}/${projectId}/${taskId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userId),
        },
      );

      return add_Assignee;
    } finally {
      setLoading(false);
    }
  }
  return { createAssignee, loading };
}
