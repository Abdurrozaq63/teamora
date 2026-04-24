import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { checkProjectAccess } from '../projectAccess';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string; projectId: string }> },
) {
  try {
    const session = await auth();

    const { tenantId, projectId } = await context.params;
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const result = await checkProjectAccess({
      userId: session.user.id,
      tenantId,
      projectId,
    });

    if (!result.ok) {
      return NextResponse.json({ message: result.reason }, { status: 403 });
    }
    const addMember = await prisma.projectMember.create({
      data: {
        userId: session.user.id,
        projectId,
        role: 'ADMIN',
      },
    });
    if (!addMember) {
      return NextResponse.json(
        { message: 'gagal menambahkan member poject' },
        { status: 402 },
      );
    }
    return NextResponse.json({ message: 'member berhasil ditambahkan' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'terjadi kesalahn server' },
      { status: 500 },
    );
  }
}
