import { prisma } from '@/lib/prisma';
import { accessCheck } from '../permissions/task.permissions';
import { NextRequest } from 'next/server';

interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
  taskId: string;
  bodyUserId: string;
}
export async function addAssignee({
  tenantId,
  projectId,
  userId,
  taskId,
  bodyUserId,
}: Props) {
  //cek role, hanya admin yang bisa menambahkan
  const cekRole = await accessCheck({ tenantId, projectId, userId });
  const role = cekRole.role;

  console.log(`server taskId: ${taskId}, userId: ${bodyUserId}`);
  if (!cekRole && role != 'ADMIN') {
    return { message: 'forbidden Role', reason: role };
  }

  //add
  console.log('cek add');
  const add = await prisma.taskAssignee.create({
    data: {
      taskId,
      userId: bodyUserId,
    },
  });
  console.log('cek after add', add);
  if (!add) {
    return { message: 'failed add assignee' };
  }
  return await prisma.taskAssignee.findMany({
    where: {
      taskId,
      userId: add.userId,
    },
    include: {
      user: true,
    },
  });
}
