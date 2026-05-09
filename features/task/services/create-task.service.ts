import { prisma } from '@/lib/prisma';
import { accessCheck } from '../permissions/task.permissions';
import { access } from 'fs';
interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
  title: string;
  description: string;
}
export async function createTask({
  tenantId,
  projectId,
  userId,
  title,
  description,
}: Props) {
  const check = await accessCheck({
    tenantId,
    projectId,
    userId,
  });
  if (!check.ok || check.role !== 'ADMIN') {
    return check.role;
  }
  const addTask = await prisma.task.create({
    data: {
      tenantId,
      projectId,
      title,
      description,
    },
  });
  return addTask;
}
