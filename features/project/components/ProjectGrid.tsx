import { Project } from '../types/project.type';

import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
}

export default function ProjectGrid({ projects }: Props) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
