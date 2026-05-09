import { prisma } from '@/lib/prisma';

interface CreateWorkspaceParams {
  userId: string;
  name: string;
}

export async function createWorkspace({ userId, name }: CreateWorkspaceParams) {
  const ownerRole = await prisma.role.findUnique({
    where: {
      name: 'OWNER',
    },
  });

  if (!ownerRole) {
    throw new Error('Role owner tidak ditemukan');
  }

  const tenant = await prisma.$transaction(async (tx) => {
    const tenant = await tx.tenant.create({
      data: {
        name,
      },
    });

    await tx.membership.create({
      data: {
        userId,
        tenantId: tenant.id,
        roleId: ownerRole.id,
        status: 'ACTIVE',
      },
    });

    return tenant;
  });

  return tenant;
}
