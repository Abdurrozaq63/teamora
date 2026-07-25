import { prisma } from '@/lib/prisma';
interface Props {
  memberId: string;
  tenantId: string;

  roleName: 'OWNER' | 'ADMIN' | 'MEMBER';
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
}

export async function updateMemberTenant({
  memberId,
  tenantId,

  roleName,
  status,
}: Props) {
  console.log('status', status);
  const role = await prisma.role.findFirst({
    where: {
      name: roleName,
    },
  });
  const update = await prisma.membership.update({
    where: {
      id: memberId,
      tenantId,
    },
    data: {
      roleId: role?.id,
      status,
    },
  });
  return update;
}
