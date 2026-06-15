import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { addAssignee } from '@/features/task/services/create-assignee.service';

export async function POST(
  req: NextRequest,
  context: {
    params: Promise<{ tenantId: string; projectId: string; taskId: string }>;
  },
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { tenantId, projectId, taskId } = await context.params;

    const body = await req.json();
    const add_Assignee = await addAssignee({
      tenantId,
      projectId,
      userId: session.user.id,
      taskId,
      bodyUserId: body,
    });

    if (!add_Assignee) {
      return add_Assignee;
    }
    console.log('add assigne server', add_Assignee);
    return NextResponse.json(add_Assignee);
  } catch (error) {
    return NextResponse.json(
      { message: 'Something Problems on Server' },
      { status: 500 },
    );
  }
}
