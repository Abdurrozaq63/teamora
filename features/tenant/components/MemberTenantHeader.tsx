export default function MemberTenantHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tenant Members
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage members, roles, and permissions inside your tenant
        </p>
      </div>

      <button
        className="
          px-5 py-2.5
          rounded-xl
          bg-linear-to-r from-blue-600 to-indigo-600
          text-white
          text-sm font-semibold
          shadow-lg shadow-blue-500/20
          hover:opacity-90
          transition
          cursor-pointer
        ">
        + Add Member
      </button>
    </div>
  );
}
