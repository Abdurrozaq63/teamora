export default function StatsCards() {
  const stats = [
    {
      label: 'Total Projects',
      value: 12,
    },
    {
      label: 'Total Tasks',
      value: 128,
    },
    {
      label: 'Tasks Completed',
      value: 98,
    },
    {
      label: 'Total Members',
      value: 6,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500">{stat.label}</p>

          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
