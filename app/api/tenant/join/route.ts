import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { inviteCode } = await req.json();
    console.log('invitedCode', inviteCode);

    // 1. Cari tenant berdasarkan invite code
    const tenant = await prisma.tenant.findUnique({
      where: { inviteCode },
    });

    if (!tenant) {
      return NextResponse.json(
        { message: 'Tenant tidak ditemukan' },
        { status: 404 },
      );
    }

    // 2. Cek apakah user sudah join
    const existingMembership = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        tenantId: tenant.id,
      },
    });

    if (existingMembership) {
      return NextResponse.json(
        { message: 'Sudah menjadi member tenant ini' },
        { status: 400 },
      );
    }

    // 3. Ambil role default (member)
    const role = await prisma.role.findFirst({
      where: { name: 'MEMBER' },
    });

    // 4. Create membership
    const membership = await prisma.membership.create({
      data: {
        userId: session.user.id,
        tenantId: tenant.id,
        roleId: role!.id,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({
      message: 'Berhasil join tenant',
      data: membership,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
