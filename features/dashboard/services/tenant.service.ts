import { prisma } from '@/lib/prisma';

export async function getDataTenant({
  userId,
  tenantId,
}: {
  userId: string;
  tenantId: string;
}) {
  return prisma.membership.findFirst({
    where: {
      userId,
      tenantId,
    },

    include: {
      tenant: true,
      role: true,
    },
  });
}
