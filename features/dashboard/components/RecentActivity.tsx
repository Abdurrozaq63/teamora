export default function RecentActivity() {
  const activities = [
    {
      user: 'Ahmad',
      action: 'membuat project baru',
      time: '2 jam lalu',
    },
    {
      user: 'Budi',
      action: 'menyelesaikan task',
      time: '5 jam lalu',
    },
    {
      user: 'Siti',
      action: 'menambahkan member',
      time: '1 hari lalu',
    },
    {
      user: 'Rina',
      action: 'mengupdate project',
      time: '2 hari lalu',
    },
  ];

  return (
    <div
      className="
    rounded-3xl
    border border-white/40 dark:border-gray-800
    bg-white/80 dark:bg-gray-900/80
    backdrop-blur-xl
    shadow-sm
    p-5
  ">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Recent Activity
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Latest actions and updates from your workspace
        </p>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="
          flex items-start justify-between gap-4
          rounded-2xl
          bg-gray-50 dark:bg-gray-800/60
          px-4 py-4
          transition-colors
          hover:bg-gray-100 dark:hover:bg-gray-800
        ">
            {/* Left */}
            <div className="flex items-start gap-3 min-w-0">
              {/* Activity Dot */}
              <div
                className="
              mt-1
              w-3 h-3 shrink-0
              rounded-full
              bg-linear-to-br from-blue-500 to-indigo-600
              shadow-sm shadow-blue-500/30
            "
              />

              {/* Text */}
              <div className="min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {activity.user}
                  </span>{' '}
                  {activity.action}
                </p>
              </div>
            </div>

            {/* Time */}
            <span
              className="
            shrink-0
            text-xs font-medium
            text-gray-400 dark:text-gray-500
          ">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
