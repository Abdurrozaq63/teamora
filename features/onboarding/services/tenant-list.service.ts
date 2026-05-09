import { prisma } from '@/lib/prisma';

export async function getTenantList(userId: string) {
  return prisma.membership.findMany({
    where: {
      userId,
      status: 'ACTIVE',
    },

    include: {
      tenant: true,
      role: true,
    },
  });
}
