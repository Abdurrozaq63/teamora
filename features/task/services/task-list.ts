import { accessCheck } from '../permissions/task.permissions';
import { prisma } from '@/lib/prisma';
interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
}
export async function getTaskList({ tenantId, projectId, userId }: Props) {
  const access = await accessCheck({
    tenantId,
    projectId,
    userId,
  });
  if (access) {
    return prisma.task.findMany({
      where: {
        tenantId,
        projectId,
      },
      include: {
        project: true,
      },
    });
  }
  return access;
}
