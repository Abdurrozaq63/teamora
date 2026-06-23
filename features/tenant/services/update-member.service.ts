import { prisma } from '@/lib/prisma';
interface Props {
  memberId: string;
  tenantId: string;
  roleId: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export async function updateMemberTenant({
  memberId,
  tenantId,
  roleId,
  status,
}: Props) {
  const update = await prisma.membership.update({
    where: {
      id: memberId,
      tenantId,
    },
    data: {
      roleId,
      status,
    },
  });
  return update;
}
