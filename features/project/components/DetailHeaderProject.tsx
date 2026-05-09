import { ProjectDetail } from '../types/detail-project.type';

interface Props {
  project: ProjectDetail;
}

export default function ProjectHeader({ project }: Props) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {project.project.name}
        </h1>

        <p className="text-sm text-gray-500">{project.project.description}</p>

        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
          Active
        </span>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm rounded border">Edit</button>

        <button className="px-3 py-1 text-sm rounded border text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
