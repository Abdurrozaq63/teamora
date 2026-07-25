import { auditLogService } from '@/features/auditLog';
import AuditLogHeader from '@/features/auditLog/components/AuditlogHeaders';
import AuditLogTable from '@/features/auditLog/components/AuditLogTable';
import Pagination from '@/features/auditLog/components/Pagination';
import { requireTenantAccess } from '@/features/dashboard/permissions/tenant-access.permission';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function auditLog({
  params,
  searchParams,
}: {
  params: Promise<{ tenantId: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const { tenantId } = await params;
  await requireTenantAccess({ userId: session.user.id, tenantId });

  const query = await searchParams;

  const page = Number(query.page ?? 1);

  const result = await auditLogService.getByTenant(tenantId, page, 10);

  return (
    <div className="space-y-3">
      <header>
        <AuditLogHeader />
      </header>
      <main>
        <AuditLogTable logs={result.data} />
        <Pagination
          page={result.pagination.page}
          totalPages={result.pagination.totalPages}
        />
      </main>
    </div>
  );
}
