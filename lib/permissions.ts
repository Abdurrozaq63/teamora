import { auth } from './auth';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await auth();
  console.log('melakukan pengecekan session');

  if (!session) {
    redirect('/login');
  }

  return session;
}

export async function requireTenant() {
  const session = await requireAuth();
  console.log('anda terdeteksi requiretenant', session.user.tenantId);
  if (!session.user.tenantId) {
    redirect('/onboarding');
  }

  return session;
}

export async function requireOwner() {
  const session = await requireTenant();
  console.log('anda terdeteksi owner', session.user.role);
  if (session.user.role !== 'OWNER') {
    redirect('/dashboard');
  }
  return session;
}

export async function requireAdminOwner() {
  const session = await requireTenant();
  const allowedRoles = ['OWNER', 'ADMIN'];

  if (!allowedRoles.includes(session.user.role ?? '')) {
    redirect('/dashboard');
  }
  return session;
}

export async function requireMember() {
  const session = await requireTenant();
  const allowedRoles = ['OWNER', 'ADMIN', 'MEMBER'];

  if (!allowedRoles.includes(session.user.role ?? '')) {
    redirect('/dashboard');
  }
  return session;
}
