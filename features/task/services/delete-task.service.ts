import { prisma } from '@/lib/prisma';
export async function deleteTask(taskId: string) {
  const deleted = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  return deleted;
}
