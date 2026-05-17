import { DashboardStats } from '../types/stats.type';

interface Props {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: Props) {
  const items = [
    {
      title: 'Projects',
      value: stats.totalProjects,
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Tasks',
      value: stats.totalTasks,
      color: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-100 dark:bg-violet-900/20',
      text: 'text-violet-600 dark:text-violet-400',
    },
    {
      title: 'Completed',
      value: stats.totalDoneTasks,
      color: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Members',
      value: stats.totalMembers,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-amber-100 dark:bg-amber-900/20',
      text: 'text-amber-600 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="
              rounded-3xl
              border border-white/40 dark:border-gray-800
              bg-white/80 dark:bg-gray-900
              backdrop-blur-xl
              shadow-sm hover:shadow-lg
              transition-all
              p-5
            ">
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </h3>
              </div>

              {/* Icon */}
              <div
                className={`
                  w-11 h-11 rounded-2xl
                  flex items-center justify-center
                  ${item.bg}
                `}>
                <div
                  className={`
                    w-5 h-5 rounded-full
                    bg-linear-to-br ${item.color}
                  `}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Card */}
      <div
        className="
          rounded-3xl
          border border-white/40 dark:border-gray-800
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-xl
          shadow-sm
          p-5
        ">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Workspace Progress
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Based on completed tasks
            </p>
          </div>

          <span
            className="
              rounded-full
              bg-blue-100 dark:bg-blue-900/30
              px-3 py-1
              text-sm font-semibold
              text-blue-700 dark:text-blue-300
            ">
            {stats.progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div
            className="
              h-full rounded-full
              bg-linear-to-r from-blue-500 to-indigo-600
              transition-all duration-500
            "
            style={{
              width: `${stats.progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
