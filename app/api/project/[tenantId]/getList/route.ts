import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string }> },
) {
  try {
    const session = await auth();
    const { tenantId } = await context.params;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // validasi akses
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

    const projects = await prisma.project.findMany({
      where: {
        tenantId,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'terjadi kesalahan' }, { status: 500 });
  }
}
