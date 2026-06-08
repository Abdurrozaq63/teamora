import { prisma } from '@/lib/prisma';
interface Props {
  memberId: string;
  userId: string;
  projectId: string;
}

export async function deleteMember({ memberId, userId, projectId }: Props) {
  return prisma.$transaction(async (tx) => {
    await tx.taskSubmission.deleteMany({
      where: {
        submittedBy: userId,
        task: {
          projectId,
        },
      },
    });

    await tx.taskAssignee.deleteMany({
      where: {
        userId,
        task: {
          projectId,
        },
      },
    });

    await tx.projectMember.delete({
      where: {
        id: memberId,
      },
    });
  });
}
