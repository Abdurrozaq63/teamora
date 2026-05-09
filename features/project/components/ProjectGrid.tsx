import { Project } from '../types/project.type';

import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
}

export default function ProjectGrid({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
