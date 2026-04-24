import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    //cek login
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const getListTenant = await prisma.membership.findMany({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
      },
      include: {
        tenant: true,
        role: true,
      },
    });

    return NextResponse.json(getListTenant);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'terjadi kesalahan',
      },
      { status: 500 },
    );
  }
}
