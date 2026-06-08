interface Props {
  roleTenant: string;
  onCreate: () => void;
}

export default function ProjectHeader({ roleTenant, onCreate }: Props) {
  return (
    <div
      className="
    flex flex-col gap-4
    sm:flex-row sm:items-center sm:justify-between
  ">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Projects
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage and organize your workspace projects
        </p>
      </div>

      {/* Action */}
      {['OWNER', 'ADMIN'].includes(roleTenant) && (
        <button
          onClick={onCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl  bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all cursor-pointer w-full sm:w-auto">
          <span className="text-base leading-none">+</span>

          <span>Create Project</span>
        </button>
      )}
    </div>
  );
}
