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
      taskSubmissions: true,
    },
  });
  return x;
}
