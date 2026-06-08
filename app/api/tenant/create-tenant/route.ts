import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import z from 'zod';
import { createWorkspace } from '@/features/onboarding/services/create-tenant.service';
const schema = z.object({
  name: z.string().min(3),
});
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthentication' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Data tidak valid' }, { status: 400 });
  }

  const createTenant = await createWorkspace({
    userId: session.user.id,
    name: parsed.data.name,
  });
  return NextResponse.json(createTenant);
}
