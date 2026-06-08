import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';

export function useDeleteProject() {
  const { projectId } = useProjectStore();
  const [loading, setLoading] = useState(false);
  const deleteProject = async (userId: string, tenantId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/project/${tenantId}/${projectId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    } finally {
      setLoading(false);
    }
  };
  return { deleteProject, loading };
}
