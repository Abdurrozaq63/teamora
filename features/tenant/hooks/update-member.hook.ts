import { useState } from 'react';

interface Props {
  memberId: string;
  tenantId: string;
  roleName: string;
  status: string;
}
export function useUpdateMemberTenant() {
  const [loading, setLoading] = useState(false);

  async function update({ memberId, tenantId, roleName, status }: Props) {
    try {
      setLoading(true);
      const res = await fetch(`/api/project/${tenantId}/member/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, roleName, status }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    } finally {
      setLoading(false);
    }
  }
  return {
    update,
    loading,
  };
}
