import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3, 'Nama workspace minima 3 karakter'),
  description: z.string().min(3, 'description minimal 3 karakter'),
  //tenantId: z.string().uuid('Tenant tidak valid'),
});

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ tenantId: string }> },
) {
  try {
    const session = await auth();
    //const tenantId = params.tenantId;
    //perlu diingat
    //validasi tenantId
    //validasi role dan membership
    const { tenantId } = await context.params;
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'data tidak valid' },
        { status: 400 },
      );
    }
    const { name, description } = parsed.data;

    const projectAdd = await prisma.project.create({
      data: {
        tenantId,
        name: name,
        description: description,
        createdBy: session.user.id,
      },
    });
    if (!projectAdd) {
      return NextResponse.json(
        { messagge: 'gagal menambhakan Project' },
        { status: 403 },
      );
    }
    return NextResponse.json({
      message: 'Project berhasil ditambahkan',
      projectId: projectAdd.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'terjadi kesalahan server' },
      { status: 500 },
    );
  }
}
