import { checkProjectAccess } from '../permissions/project-access.permission';

interface Props {
  tenantId: string;
  projectId: string;
  userId: string;
}

export async function getProjectDetail({ tenantId, projectId, userId }: Props) {
  return checkProjectAccess({
    tenantId,
    projectId,
    userId,
  });
}
