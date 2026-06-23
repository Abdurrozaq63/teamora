import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { tenantPermission } from '@/features/tenant/permissions/tenant.permission';
import { updateMemberTenant } from '@/features/tenant/services/update-member.service';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string }> },
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  const { tenantId } = await context.params;

  const body = await req.json();
  const permission = await tenantPermission({
    tenantId,
    userId: session.user.id,
  });
  if (!permission) {
    return NextResponse.json(
      {
        message: 'Unauthorization',
      },
      {
        status: 401,
      },
    );
  }
  const update = await updateMemberTenant({
    memberId: body.memberId,
    tenantId,
    roleId: body.roleId,
    status: body.status,
  });

  return NextResponse.json(update);
}
