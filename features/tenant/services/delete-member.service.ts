import { prisma } from '@/lib/prisma';
interface Props {
  memberId: string;
  tenantId: string;
  targetId: string;
}
export async function deleteMemberTenant({
  memberId,
  tenantId,
  targetId,
}: Props) {
  return prisma.$transaction(async (tx) => {
    await tx.projectMember.deleteMany({
      where: {
        user: {
          id: targetId,
        },
        project: {
          tenantId,
        },
      },
    });

    await tx.membership.delete({
      where: {
        id: memberId,
      },
    });
  });
}
