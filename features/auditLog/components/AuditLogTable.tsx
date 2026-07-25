import { AuditLog } from '../types/audit-log.type';

interface Props {
  logs: AuditLog[];
}

export default function AuditLogTable({ logs }: Props) {
  const actionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';

      case 'UPDATE':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';

      case 'DELETE':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300">
        <span>User</span>
        <span>Action</span>
        <span>Entity</span>
        <span>Date</span>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {logs.map((log) => (
          <div
            key={log.id}
            className="
              flex flex-col gap-3
              p-4
              md:grid md:grid-cols-4 md:gap-4 md:items-center
              hover:bg-gray-50 dark:hover:bg-gray-800/40
              transition-colors
            ">
            {/* User */}
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[11px] uppercase text-gray-400 md:hidden">
                  User
                </span>

                <p className="font-medium text-gray-900 dark:text-white">
                  {log.user.name}
                </p>

                <p className="text-xs text-gray-500">{log.user.email}</p>
              </div>
            </div>

            {/* Action */}
            <div>
              <span className="text-[11px] uppercase text-gray-400 md:hidden">
                Action
              </span>

              <div className="mt-1">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${actionColor(
                    log.action,
                  )}`}>
                  {log.action}
                </span>
              </div>
            </div>

            {/* Entity */}
            <div>
              <span className="text-[11px] uppercase text-gray-400 md:hidden">
                Entity
              </span>

              <p className="font-medium text-gray-700 dark:text-gray-300">
                {log.entity}
              </p>
            </div>

            {/* Date */}
            <div>
              <span className="text-[11px] uppercase text-gray-400 md:hidden">
                Date
              </span>

              <p className="text-sm text-gray-500">
                {new Date(log.createdAt).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Entity Id */}
            {/* <div>
              <span className="text-[11px] uppercase text-gray-400 md:hidden">
                Entity ID
              </span>

              <p className="truncate text-sm font-mono text-gray-500">
                {log.entityId}
              </p>
            </div> */}
          </div>
        ))}

        {logs.length === 0 && (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400">
            No activity found.
          </div>
        )}
      </div>
    </div>
  );
}
