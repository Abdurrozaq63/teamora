import { prisma } from '@/lib/prisma';

interface Props {
  tenantId: string;
}

export async function getDashboardStats({ tenantId }: Props) {
  const [totalProjects, totalTasks, totalDoneTasks, totalMembers] =
    await Promise.all([
      prisma.project.count({
        where: {
          tenantId,
          deletedAt: null,
        },
      }),

      prisma.task.count({
        where: {
          tenantId,
          deletedAt: null,
        },
      }),

      prisma.task.count({
        where: {
          tenantId,
          status: 'DONE',
          deletedAt: null,
        },
      }),

      prisma.membership.count({
        where: {
          tenantId,
          status: 'ACTIVE',
        },
      }),
    ]);
  const progress =
    totalTasks === 0 ? 0 : Math.round((totalDoneTasks / totalTasks) * 100);

  return {
    totalProjects,
    totalTasks,
    totalDoneTasks,
    totalMembers,
    progress,
  };
}
