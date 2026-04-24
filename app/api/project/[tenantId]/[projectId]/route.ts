import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string; projectId: string }> },
) {
  try {
    const session = await auth();
    const { tenantId, projectId } = await context.params;
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    //Member Of Tenant
    const membership = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        tenantId,
        status: 'ACTIVE',
      },
    });

    if (!membership) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const getProject = await prisma.projectMember.findFirst({
      where: {
        userId: session.user.id,
        projectId,
      },
      include: {
        project: true,
      },
    });
    if (!getProject) {
      return NextResponse.json({ message: 'Undefined' }, { status: 402 });
    }
    return NextResponse.json(getProject);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'terjadi kesalahan' }, { status: 500 });
  }
}
