import { prisma } from '@/lib/prisma';
export async function accessCheck({
  userId,
  tenantId,
  projectId,
}: {
  userId: string;
  tenantId: string;
  projectId: string;
}) {
  const Member = await prisma.projectMember.findFirst({
    where: {
      userId,
      projectId,
      project: {
        tenantId,
      },
    },
  });
  if (!Member) {
    return { ok: false };
  }
  return { ok: true, role: Member.role as 'ADMIN' | 'MEMBER' };
}
