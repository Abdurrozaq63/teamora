import { prisma } from '@/lib/prisma';

export async function getProjectList(tenantId: string) {
  return prisma.project.findMany({
    where: {
      tenantId,
      deletedAt: null,
    },

    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tasks: {
        where: {
          deletedAt: null,
        },
      },
    },
  });
}
