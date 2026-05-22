import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function joinTenant(inviteCode: string) {
  const session = await auth();
  if (!session) {
    throw Error;
  }

  const tenant = await prisma.tenant.findFirst({
    where: { inviteCode },
  });

  if (!tenant) {
    throw Error;
  }

  const memberRole = await prisma.role.findUnique({
    where: { name: 'MEMBER' },
  });

  if (!memberRole) {
    throw Error;
  }

  await prisma.membership.create({
    data: {
      userId: session.user.id,
      tenantId: tenant.id,
      roleId: memberRole.id,
      status: 'ACTIVE',
    },
  });
  return tenant;
}
