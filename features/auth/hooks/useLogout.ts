'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useLogout() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);

    try {
      await signOut({
        redirect: false,
      });

      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  return {
    logout,
    loading,
  };
}
