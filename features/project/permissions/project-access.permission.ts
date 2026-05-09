import { prisma } from '@/lib/prisma';

interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
}

export async function checkProjectAccess({
  tenantId,
  projectId,
  userId,
}: Props) {
  return prisma.projectMember.findFirst({
    where: {
      userId,
      projectId,

      project: {
        tenantId,
      },
    },

    include: {
      project: true,
    },
  });
}
