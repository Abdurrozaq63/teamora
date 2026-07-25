import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { tenantPermission } from '@/features/tenant/permissions/tenant.permission';
import { updateMemberTenant } from '@/features/tenant/services/update-member.service';
import { deleteMemberTenant } from '@/features/tenant/services/delete-member.service';

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
    roleName: body.roleName,
    status: body.status as 'ACTIVE' | 'INVITED' | 'SUSPENDED',
  });

  return NextResponse.json(update);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string }> },
) {
  console.log('sukses akses api');
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

  try {
    const deleted = await deleteMemberTenant({
      memberId: body.memberId,
      targetId: body.targetId,
      tenantId,
    });
    return NextResponse.json({
      success: true,
      message: 'Member removed successfully',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to remove member',
      },
      {
        status: 500,
      },
    );
  }
}
