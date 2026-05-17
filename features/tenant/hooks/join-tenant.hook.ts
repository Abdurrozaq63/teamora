import { useState } from 'react';

export function useJoinTenant() {
  const [loading, setLoading] = useState(false);

  const joinTenant = async (inviteCode: string) => {
    try {
      setLoading(true);
      const join = await fetch(`/api/tenant/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inviteCode),
      });
      const data = join.json();

      return data;
    } finally {
      setLoading(false);
    }
  };
  return { joinTenant, loading };
}
