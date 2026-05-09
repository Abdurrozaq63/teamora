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
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">
        Recent Activity
      </h2>

      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
        {activities.map((activity, index) => (
          <div key={index} className="flex justify-between">
            <span>
              <strong>{activity.user}</strong> {activity.action}
            </span>

            <span>{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
