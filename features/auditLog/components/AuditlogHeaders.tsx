interface Props {
  //   roleTenant: string;
  //   onCreate: () => void;
}

export default function AuditLogHeader() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Audit Log
      </h2>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        View all activities performed inside this workspace.
      </p>
    </div>
  );
}
