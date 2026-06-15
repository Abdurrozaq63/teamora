import { prisma } from '@/lib/prisma';
interface Props {
  taskId: string;
  message: string;
}
export async function updateMessage({ taskId, message }: Props) {
  const update = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      messageReview: message,
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
  return update;
}
