import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    //cek login
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const getTenant = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        tenantId: body.tenantId,
      },
      include: {
        tenant: true,
        role: true,
      },
    });

    if (!getTenant) {
      return NextResponse.json(
        { message: 'Tenant tidak ditemukan', redirectTo: '/onboarding' },
        { status: 404 },
      );
    }

    return NextResponse.json(getTenant);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'terjadi kesalahan server' },
      { status: 500 },
    );
  }
}
