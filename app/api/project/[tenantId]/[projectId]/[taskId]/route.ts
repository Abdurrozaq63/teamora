import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { accessCheck } from '@/features/task/permissions/task.permissions';
import { updateTask } from '@/features/task/services/update-task.service';
import { deleteTask } from '@/features/task/services/delete-task.service';

//update task data
export async function PUT(
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

  const update = await updateTask({
    title: body.title,
    description: body.description,
    dueDate: new Date(body.dueDate),
    taskId: taskId,
  });

  return NextResponse.json(update);
}

export async function DELETE(
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

  const deleted = await deleteTask(taskId);

  return NextResponse.json(deleted);
}
