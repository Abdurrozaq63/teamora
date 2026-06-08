import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { taskId, content, fileUrl, submittedBy } = body;

    if (!taskId) {
      return NextResponse.json(
        {
          message: 'Task ID is required',
        },
        {
          status: 400,
        },
      );
    }
    if (!fileUrl) {
      return NextResponse.json(
        { message: 'file url unfounded' },
        { status: 400 },
      );
    }
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: 'REVIEW',
      },
    });

    const submission = await prisma.taskSubmission.create({
      data: {
        taskId,
        content,
        fileUrl,
        submittedBy,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Internal server error',
        ok: false,
      },

      {
        status: 500,
      },
    );
  }
}
