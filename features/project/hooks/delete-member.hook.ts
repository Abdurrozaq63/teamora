import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';

export function useDeleteMember() {
  const { projectId } = useProjectStore();
  const [loading, setLoading] = useState(false);
  const deleteMember = async (
    memberId: string,
    targetUser: string,
    tenantId: string,
  ) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/project/${tenantId}/${projectId}/member/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, targetUser }),
      });
      return res;
    } finally {
      setLoading(false);
    }
  };
  return { deleteMember, loading };
}
