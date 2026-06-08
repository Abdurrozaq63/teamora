'use client';
import { useRouter } from 'next/navigation';

interface Props {
  tenantId: string;
  projectId: string;
  roleProject: 'ADMIN' | 'MEMBER' | undefined;
}

export default function DetailTaskHeader({
  tenantId,
  projectId,
  roleProject,
}: Props) {
  const router = useRouter();
  const handleBack = () => {
    router.push(`/${tenantId}/projects/${projectId}`);
  };
  return (
    <div
      className="
    mb-6
    flex flex-col gap-5
    lg:flex-row lg:items-center lg:justify-between
  ">
      {/* Left */}
      <div className="min-w-0">
        {/* Back Button */}
        <button
          onClick={() => handleBack()}
          className="
        inline-flex items-center gap-2
        text-sm font-medium
        text-gray-500 dark:text-gray-400
        hover:text-gray-900 dark:hover:text-white
        transition-colors
        cursor-pointer
      ">
          <span>Back to Tasks</span>
        </button>

        {/* Title */}
        <div className="mt-4">
          <h1
            className="
          text-3xl font-bold tracking-tight
          text-gray-900 dark:text-white
        ">
            Task Detail
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            View task information, submissions, and progress
          </p>
        </div>
      </div>

      {/* Actions */}
      {roleProject === 'ADMIN' && (
        <div
          className="
      flex flex-col sm:flex-row
      gap-3
      w-full lg:w-auto
    ">
          {/* Edit */}
          <button
            className="
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white/70 dark:bg-gray-900
        px-5 py-3
        text-sm font-medium
        text-gray-700 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-800
        transition-colors
        cursor-pointer
        w-full sm:w-auto
      ">
            Edit Task
          </button>

          {/* Done */}
          <button
            className="
        rounded-2xl
        bg-linear-to-r from-emerald-500 to-green-600
        px-5 py-3
        text-sm font-semibold text-white
        shadow-lg shadow-emerald-500/20
        hover:opacity-90
        transition-opacity
        cursor-pointer
        w-full sm:w-auto
      ">
            Mark as Done
          </button>
        </div>
      )}
    </div>
  );
}
