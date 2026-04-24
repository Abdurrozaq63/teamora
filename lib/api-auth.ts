import { auth } from './auth';
import { NextResponse } from 'next/server';

export async function requireApiAuth() {
  const session = await auth();

  if (!session) {
    return {
      error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { session };
}

export async function requireApiTenant() {
  const result = await requireApiAuth();

  if ('error' in result) return result;

  if (!result.session.user.tenantId) {
    return {
      error: NextResponse.json(
        { message: 'no active tenant' },
        { status: 403 },
      ),
    };
  }
  return result;
}

export async function requireApiRole(roles: string[]) {
  const result = await requireApiTenant();

  if ('error' in result) return result;

  const role = result.session.user.role;

  if (!roles.includes(role ?? '')) {
    return {
      error: NextResponse.json({ message: 'Forbidden' }, { status: 403 }),
    };
  }
  return result;
}
