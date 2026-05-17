import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';

export function useCreateMember() {
  const { projectId, setMemberProject } = useProjectStore();
  const [loading, setLoading] = useState(false);
  const createMember = async (userId: string, tenantId: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/project/${tenantId}/${projectId}/addMember/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userId),
        },
      );
      return res;
    } finally {
      setLoading(false);
    }
  };
  return { createMember, loading };
}
