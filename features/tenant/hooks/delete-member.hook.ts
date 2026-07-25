import { useState } from 'react';

export function useDeleteMember() {
  const [loading, setLoading] = useState(false);
  const deleteMember = async (
    memberId: string,
    tenantId: string,
    targetId: string,
  ) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/project/${tenantId}/member/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, targetId }),
      });
      return res;
    } finally {
      setLoading(false);
    }
  };
  return { deleteMember, loading };
}
