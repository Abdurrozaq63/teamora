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
  console.log('berhasil mengunjungi dashboard');
  const session = await auth();
  console.log('berhasil membaca session', session);

  if (!session) {
    console.log('session tidak valid', session);
    redirect('/login');
  }

  const { tenantId } = await params;

  const membership = await requireTenantAccess({
    userId: session.user.id,
    tenantId,
  });

  return <DashboardOverview membership={membership} />;
}
