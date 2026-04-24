import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3, 'Nama workspace minimal 3 karakter'),
});

export async function POST(req: NextRequest) {
  try {
    //cek login
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    //validasi body
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'data tidak valid' },
        { status: 400 },
      );
    }

    const { name } = parsed.data;

    //ambil role OWNER
    const ownerRole = await prisma.role.findUnique({
      where: { name: 'OWNER' },
    });

    if (!ownerRole) {
      return NextResponse.json(
        { message: 'Role owner tidak ditemukan' },
        { status: 500 },
      );
    }

    //transaction create tenant dan membership
    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name,
        },
      });
      await tx.membership.create({
        data: {
          userId: session.user.id,
          tenantId: tenant.id,
          roleId: ownerRole.id,
          status: 'ACTIVE',
        },
      });

      return tenant;
    });

    return NextResponse.json(
      { message: 'Tenant berhasil dibuat', tenant: result.id },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 },
    );
  }
}
