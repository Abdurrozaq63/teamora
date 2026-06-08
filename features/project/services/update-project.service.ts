import { prisma } from '@/lib/prisma';
interface Props {
  projectId: string;
  tenantId: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'ARCHIVED';
}
export async function updateProject({
  projectId,
  tenantId,
  name,
  description,
  status,
}: Props) {
  const update = await prisma.project.update({
    where: {
      id: projectId,
      tenantId,
    },
    data: {
      name,
      description,
      status,
    },
  });
  return update;
}
