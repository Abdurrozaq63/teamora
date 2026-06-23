import { prisma } from '@/lib/prisma';

interface Props {
  tenantId: string;
  userId: string;
}
export async function tenantPermission({ tenantId, userId }: Props) {
  const membership = await prisma.membership.findFirst({
    where: {
      tenantId,
      userId,
      status: 'ACTIVE',
    },

    include: {
      role: true,
    },
  });

  if (!membership) {
    return false;
  }

  return ['OWNER', 'ADMIN'].includes(membership.role.name);
}
