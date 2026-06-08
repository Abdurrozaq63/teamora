import { prisma } from '@/lib/prisma';
import { ProjectRole } from '@prisma/client';
interface Props {
  memberId: string;
  userId: string;
  projectId: string;
  role: ProjectRole;
}
export async function updateRoleProject({
  memberId,
  userId,
  projectId,
  role,
}: Props) {
  const upd = await prisma.projectMember.update({
    where: {
      id: memberId,
      projectId,
    },
    data: {
      role,
    },
  });
  return upd;
}
