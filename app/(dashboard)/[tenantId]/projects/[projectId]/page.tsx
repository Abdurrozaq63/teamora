import { auth } from '@/lib/auth';

import { redirect } from 'next/navigation';

import { getProjectDetail } from '@/features/project/services/detail-project.service';

import ProjectHeader from '@/features/project/components/DetailHeaderProject';

import ProjectTabs from '@/features/project/components/DetailProjectTabs';
import { getTaskList } from '@/features/task/services/task-list';
import { memberProjectList } from '@/features/project/services/member-list.service';
import { unmemberProject } from '@/features/project/services/unmember-project.service';

interface Props {
  params: Promise<{
    tenantId: string;
    projectId: string;
  }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const { tenantId, projectId } = await params;

  const project = await getProjectDetail({
    tenantId,
    projectId,
    userId: session.user.id,
  });
  const task = await getTaskList({
    tenantId,
    projectId,
    userId: session.user.id,
  });
  const unmemberProjects = await unmemberProject({ tenantId, projectId });
  const memberProject = await memberProjectList({ tenantId, projectId });

  if (!project) {
    redirect(`/${tenantId}/projects?error=forbidden`);
  }

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />

      <ProjectTabs
        tenantId={tenantId}
        projectId={projectId}
        task={task}
        memberProject={memberProject}
        unmemberProjects={unmemberProjects}
      />
    </div>
  );
}
