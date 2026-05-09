import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import { requireTenantAccess } from '@/features/dashboard/permissions/tenant-access.permission';

import DashboardOverview from '@/features/dashboard/components/DashboardOverview';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{
    tenantId: string;
  }>;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const { tenantId } = await params;

  const membership = await requireTenantAccess({
    userId: session.user.id,
    tenantId,
  });

  return <DashboardOverview membership={membership} />;
}
