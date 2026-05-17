import { prisma } from '@/lib/prisma';
interface Props {
  tenantId: string;
  projectId: string;
}
export async function unmemberProject({ tenantId, projectId }: Props) {
  const availableMembers = await prisma.membership.findMany({
    where: {
      tenantId,
      user: {
        projectMembers: {
          none: {
            projectId,
          },
        },
      },
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
  return availableMembers;
}
