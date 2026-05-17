import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { createMemberProject } from '@/features/project/services/create-member.service';

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
    const body = await req.json();
    const addMember = await createMemberProject({
      tenantId,
      projectId,
      userId: session.user.id,
      bodyUserId: body,
    });
    if (!addMember) {
      return NextResponse.json(
        { message: 'gagal menambahkan member poject' },
        { status: 403 },
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
