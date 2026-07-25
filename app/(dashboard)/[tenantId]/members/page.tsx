import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { memberTenant } from '@/features/tenant/services/member-list.service';
import { requireTenantAccess } from '@/features/dashboard/permissions/tenant-access.permission';
import MemberTenantHeader from '@/features/tenant/components/MemberTenantHeader';
import MemberTenantTable from '@/features/tenant/components/MemberTenantList';

export default async function MemberTenant({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const { tenantId } = await params;
  await requireTenantAccess({ userId: session.user.id, tenantId });

  const listMember = await memberTenant(tenantId);

  return (
    <div className="space-y-3">
      <MemberTenantHeader />
      <MemberTenantTable tenantId={tenantId} listMember={listMember} />
    </div>
  );
}
