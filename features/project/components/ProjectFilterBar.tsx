export default function ProjectFilterBar() {
  return (
    <div
      className="
    flex flex-col gap-4
    lg:flex-row lg:items-center lg:justify-between
  ">
      {/* Search */}
      <div className="relative w-full lg:max-w-sm">
        <input
          type="text"
          placeholder="Search project..."
          className="
        w-full
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        px-4 py-3
        pr-11
        text-sm text-gray-900 dark:text-white
        placeholder:text-gray-400
        shadow-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500/40
        focus:border-blue-500
        transition
      "
        />

        {/* Search Icon */}
        <div
          className="
        absolute right-4 top-1/2 -translate-y-1/2
        text-gray-400
      ">
          🔍
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status Filter */}
        <select
          className="
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        px-4 py-3
        text-sm text-gray-700 dark:text-gray-300
        shadow-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500/40
        focus:border-blue-500
        transition
        cursor-pointer
      ">
          <option>All Status</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        {/* Sort Filter */}
        <select
          className="
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        px-4 py-3
        text-sm text-gray-700 dark:text-gray-300
        shadow-sm
        focus:outline-none
        focus:ring-2 focus:ring-blue-500/40
        focus:border-blue-500
        transition
        cursor-pointer
      ">
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
}
