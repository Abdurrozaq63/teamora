import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { updateProject } from '@/features/project/services/update-project.service';
import { checkProjectAccess } from '@/features/project/permissions/project-access.permission';
import { deleteProject } from '@/features/project/services/delete-project.service';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string; projectId: string }> },
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { tenantId, projectId } = await context.params;
    //validasi params belum dibuat
    //Member Of Tenant
    const membership = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        tenantId,
        status: 'ACTIVE',
      },
    });

    if (!membership) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 401 });
    }

    const getProject = await prisma.projectMember.findFirst({
      where: {
        userId: session.user.id,
        projectId,
        project: {
          tenantId,
        },
      },
      include: {
        project: true,
      },
    });
    if (!getProject) {
      return NextResponse.json({ message: 'Undefined' }, { status: 404 });
    }
    return NextResponse.json(getProject);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'terjadi kesalahan' }, { status: 500 });
  }
}
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
  console.log('permissons', permissions);
  console.log('role permissons', permissions?.role);
  if (!permissions || permissions?.role == 'MEMBER') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 401 });
  }

  const body = await req.json();
  console.log('body', body);
  const update = await updateProject({
    projectId,
    tenantId,
    name: body.name,
    description: body.description,
    status: body.status,
  });
  return NextResponse.json(update);
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
  console.log('permissons', permissions);
  console.log('role permissons', permissions?.role);
  if (!permissions || permissions?.role == 'MEMBER') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 401 });
  }
  const del = await deleteProject({
    tenantId,
    projectId,
    userId: session.user.id,
  });
  return NextResponse.json(del);
}
