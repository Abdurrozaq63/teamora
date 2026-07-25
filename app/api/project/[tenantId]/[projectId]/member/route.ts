import { auth } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import { checkProjectAccess } from '@/features/project/permissions/project-access.permission';
import { updateRoleProject } from '@/features/project/services/update-role-project.service';
import { deleteMember } from '@/features/project/services/delete-member.service';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string; projectId: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { tenantId, projectId } = await context.params;
  const permissions = await checkProjectAccess({
    tenantId,
    projectId,
    userId: session.user.id,
  });

  if (!permissions || permissions?.role == 'MEMBER') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 401 });
  }
  const body = await req.json();

  const upd = await updateRoleProject({
    memberId: body.memberId,
    userId: session.user.id,
    projectId,
    role: body.role,
  });
  return NextResponse.json(upd);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string; projectId: string }> },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { tenantId, projectId } = await context.params;
  const permissions = await checkProjectAccess({
    tenantId,
    projectId,
    userId: session.user.id,
  });
  if (!permissions || permissions?.role == 'MEMBER') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 401 });
  }
  const body = await req.json();

  try {
    await deleteMember({
      memberId: body.memberId,
      userId: body.targetUser,
      projectId,
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
