import { NextRequest, NextResponse } from 'next/server';
import { joinTenant } from '@/features/tenant/services/join-tenant.service';

export async function POST(req: NextRequest) {
  try {
    const inviteCode = await req.json();
    const membership = await joinTenant(inviteCode);
    if (!membership) {
      throw Error;
    }
    console.log(`invite code ${inviteCode}`);
    return NextResponse.json({
      message: 'Berhasil join tenant',
      data: membership,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
