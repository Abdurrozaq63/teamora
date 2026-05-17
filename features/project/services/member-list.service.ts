import { prisma } from '@/lib/prisma';
interface Props {
  tenantId: string;
  projectId: string;
}
export async function memberProjectList({ tenantId, projectId }: Props) {
  const list = await prisma.projectMember.findMany({
    where: {
      projectId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
  return list;
}
