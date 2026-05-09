import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

import { createProjectSchema } from '@/features/project/validations/create-project.schema';

import { canCreateProject } from '@/features/project/permissions/create-project.permission';

import { createProject } from '@/features/project/services/create-project.service';

export async function POST(
  req: NextRequest,

  context: {
    params: Promise<{
      tenantId: string;
    }>;
  },
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        },
      );
    }

    const { tenantId } = await context.params;

    const body = await req.json();

    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: 'Data tidak valid',
          errors: parsed.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const allowed = await canCreateProject({
      tenantId,
      userId: session.user.id,
    });

    if (!allowed) {
      return NextResponse.json(
        {
          message: 'Forbidden',
        },
        {
          status: 403,
        },
      );
    }

    const project = await createProject({
      tenantId,

      name: parsed.data.name,

      description: parsed.data.description,

      userId: session.user.id,
    });

    return NextResponse.json(
      {
        message: 'Project berhasil dibuat',

        project,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Terjadi kesalahan server',
      },
      {
        status: 500,
      },
    );
  }
}
