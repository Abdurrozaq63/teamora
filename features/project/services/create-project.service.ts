import { prisma } from '@/lib/prisma';

interface Props {
  tenantId: string;
  name: string;
  description: string;
  userId: string;
}

export async function createProject({
  tenantId,
  name,
  description,
  userId,
}: Props) {
  const project = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        tenantId,
        name,
        description,
        createdBy: userId,
      },
    });
    await tx.projectMember.create({
      data: {
        userId,
        projectId: project.id,
        role: 'ADMIN',
      },
    });
    return project;
  });

  return project;
}
