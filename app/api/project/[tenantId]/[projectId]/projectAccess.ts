import { prisma } from '@/lib/prisma';

export async function checkProjectAccess({
  userId,
  tenantId,
  projectId,
}: {
  userId: string;
  tenantId: string;
  projectId: string;
}) {
  // 🔹 1. cek tenant membership
  const membership = await prisma.membership.findFirst({
    where: {
      userId,
      tenantId,
      status: 'ACTIVE',
    },
    include: {
      role: true,
    },
  });

  if (!membership) {
    return { ok: false, reason: 'NO_TENANT' };
  }

  if (!['ADMIN', 'OWNER'].includes(membership.role.name)) {
    return { ok: false, reason: 'INVALID_TENANT_ROLE' };
  }
  if (['ADMIN', 'OWNER'].includes(membership.role.name)) {
    return { ok: true, reason: 'SUCCESS' };
  }

  // 🔹 2. cek project membership
  const projectMember = await prisma.projectMember.findFirst({
    where: {
      userId,
      projectId,
    },
  });

  if (!projectMember) {
    return { ok: false, reason: 'NO_PROJECT_ACCESS' };
  }

  if (projectMember.role !== 'ADMIN') {
    return { ok: false, reason: 'INVALID_PROJECT_ROLE' };
  }

  return { ok: true };
}
