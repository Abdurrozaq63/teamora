'use client';

import { useRouter } from 'next/navigation';

import { Project } from '../types/project.type';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const router = useRouter();

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
        {project.name}
      </h3>

      <p className="text-sm text-gray-500 mb-2">{project.description}</p>

      <div className="text-sm text-gray-500 space-y-1 mb-3">
        <p>Status: Active</p>

        <p>Total Tasks: 12</p>

        <p>Created By: Admin</p>

        <p>Last Updated: 2 days ago</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            router.push(`/${project.tenantId}/projects/${project.id}`)
          }
          className="px-3 py-1 text-sm rounded cursor-pointer bg-black text-white">
          View
        </button>

        <button className="px-3 py-1 cursor-pointer text-sm rounded border">
          Edit
        </button>

        <button className="px-3 py-1 text-sm rounded border cursor-pointer text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
