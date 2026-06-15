import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { accessCheck } from '@/features/task/permissions/task.permissions';
import { updateMessage } from '@/features/task/services/update-massage.service';

export async function POST(
  req: NextRequest,
  context: {
    params: Promise<{ tenantId: string; projectId: string; taskId: string }>;
  },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { tenantId, projectId, taskId } = await context.params;
  const permissions = await accessCheck({
    userId: session.user.id,
    tenantId,
    projectId,
  });
  if (!permissions || permissions.role == 'MEMBER') {
    return NextResponse.json(
      { message: 'Unauthorized', role: permissions.role },
      { status: 401 },
    );
  }

  const body = await req.json();
  const add = await updateMessage({ taskId, message: body });

  return NextResponse.json(add);
}
