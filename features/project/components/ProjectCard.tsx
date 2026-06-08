'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Project } from '../types/project.type';

interface Props {
  projects: Project[];
}

export default function ProjectCard({ projects }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error')) {
      toast.error('Access Forbidden');
    }
  }, []);

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Projects
        </h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Manage and monitor your projects
        </p>
      </div>

      {/* Desktop / Tablet Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
        <span>Project</span>
        <span>Status</span>
        <span>Total Tasks</span>
        <span>Action</span>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {/* Desktop / Tablet Layout */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="
        hidden md:grid
        grid-cols-4 gap-4 items-center
        px-4 py-4
        hover:bg-gray-50 dark:hover:bg-gray-800/40
        transition-colors
      ">
            {/* Project */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {project.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                {project.description}
              </p>
            </div>

            {/* Status */}
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Active
              </span>
            </div>

            {/* Tasks */}
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                12 Tasks
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center">
              <button
                onClick={() =>
                  router.push(`/${project.tenantId}/projects/${project.id}`)
                }
                className="px-3 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
                View
              </button>
            </div>
          </div>
        ))}

        {/* Mobile Layout */}
        {projects.map((project) => (
          <div key={project.id} className="md:hidden p-4 space-y-4">
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Active
              </span>
            </div>

            {/* Info */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 px-3 py-3">
              <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                Total Tasks
              </p>

              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                12 Tasks
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  router.push(`/${project.tenantId}/projects/${project.id}`)
                }
                className="w-full px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
                View
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  Edit
                </button>

                <button className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/50 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
