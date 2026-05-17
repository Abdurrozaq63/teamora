import { prisma } from '@/lib/prisma';

export async function assigneeList(taskId: string) {
  const list = await prisma.taskAssignee.findMany({
    where: {
      taskId,
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
