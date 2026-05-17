import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { createTask } from '@/features/task/services/create-task.service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string; projectId: string }> },
) {
  try {
    const session = await auth();
    const { tenantId, projectId } = await context.params;
    const body = await req.json();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const addTask = await createTask({
      tenantId,
      projectId,
      userId: session.user.id,
      title: body.title,
      description: body.description,
    });
    if (!addTask) {
      return NextResponse.json(
        { message: 'gagal menambahkan member poject', reason: addTask },
        { status: 402 },
      );
    }
    return NextResponse.json({ message: 'success create task', task: addTask });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'terjadi kesalahn server' },
      { status: 500 },
    );
  }
}
