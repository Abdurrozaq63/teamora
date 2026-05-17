import { accessCheck } from '../permissions/task.permissions';
import { prisma } from '@/lib/prisma';
import { Task } from '../types/task.type';
interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
  taskId: string;
}
export async function detailTask({
  tenantId,
  projectId,
  userId,
  taskId,
}: Props) {
  //cek permissions
  const permission = await accessCheck({ tenantId, projectId, userId });
  if (!permission.ok) {
    throw new Error('Unauthorized');
  }
  //ambil task, include assignee, include submission
  const x = await prisma.task.findUniqueOrThrow({
    where: {
      id: taskId,
      tenantId,
      projectId,
    },
    include: {
      taskAssignees: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  // if (!x) {
  //   return notFound();
  //   // return {
  //   //   message: 'something problem on finding data',
  //   //   reason: x,
  //   //   ok: false,
  //   // };
  // }
  return x;
}
