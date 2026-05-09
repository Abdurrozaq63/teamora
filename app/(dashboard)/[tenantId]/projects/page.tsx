import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import { requireTenantAccess } from '@/features/dashboard/permissions/tenant-access.permission';

import { getProjectList } from '@/features/project/services/project-list.service';

import ProjectPageView from '@/features/project/components/ProjectPageView';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{
    tenantId: string;
  }>;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const { tenantId } = await params;

  await requireTenantAccess({
    userId: session.user.id,
    tenantId,
  });

  const projects = await getProjectList(tenantId);

  return <ProjectPageView tenantId={tenantId} initialProjects={projects} />;
}
