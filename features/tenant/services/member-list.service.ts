import { prisma } from '@/lib/prisma';

export async function memberTenant(tenantId: string) {
  const member = await prisma.membership.findMany({
    where: {
      tenantId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      role: true,
    },
  });
  return member;
}
