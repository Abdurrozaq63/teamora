import { prisma } from '@/lib/prisma';
import { checkProjectAccess } from '../permissions/project-access.permission';
import { auditLogService } from '@/features/auditLog';

interface Props {
  userId: string;
  projectId: string;
  tenantId: string;
  bodyUserId: string;
}
export async function createMemberProject({
  tenantId,
  projectId,
  userId,
  bodyUserId,
}: Props) {
  const permission = await checkProjectAccess({ tenantId, projectId, userId });
  console.log('permission', permission);
  if (!permission || permission.role !== 'ADMIN') {
    console.log('akses ditolak');
    return null;
  }
  const add = await prisma.projectMember.create({
    data: {
      userId: bodyUserId,
      projectId,
      role: 'MEMBER',
    },
  });
  await auditLogService.create({
    tenantId,
    userId,
    entity: 'PROJECT MEMBER',
    entityId: add.id,
    action: 'CREATE',
  });
  return add;
}
