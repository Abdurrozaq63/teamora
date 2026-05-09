import { redirect } from 'next/navigation';

import { getDataTenant } from '../services/tenant.service';

export async function requireTenantAccess({
  userId,
  tenantId,
}: {
  userId: string;
  tenantId: string;
}) {
  const membership = await getDataTenant({
    userId,
    tenantId,
  });

  if (!membership) {
    redirect('/onboarding');
  }

  return membership;
}
