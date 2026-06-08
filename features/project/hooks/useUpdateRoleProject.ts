'use client';

import { useState } from 'react';

export function useUpdateRoleProject() {
  const [loading, setLoading] = useState(false);

  async function updateRole(
    memberId: string,
    role: 'ADMIN' | 'MEMBER' | '',
    tenantId: string,
    projectId: string,
  ) {
    try {
      setLoading(true);

      const res = await fetch(`/api/project/${tenantId}/${projectId}/member/`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          memberId,
          role,
        }),
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
    updateRole,
    loading,
  };
}
