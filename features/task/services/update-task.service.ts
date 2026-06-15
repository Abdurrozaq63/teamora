import { prisma } from '@/lib/prisma';
interface Props {
  title: string;
  description: string;
  dueDate: Date;
  taskId: string;
}
export async function updateTask({
  title,
  description,
  dueDate,
  taskId,
}: Props) {
  const update = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title: title,
      description: description,
      dueDate: dueDate,
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
