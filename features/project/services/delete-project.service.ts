import { prisma } from '@/lib/prisma';
interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
}
export async function deleteProject({ tenantId, projectId, userId }: Props) {
  const del = await prisma.project.update({
    where: {
      id: projectId,
      tenantId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  return del;
}
