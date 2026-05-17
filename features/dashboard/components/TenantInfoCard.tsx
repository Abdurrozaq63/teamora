import { Membership } from '@/features/dashboard/types/tenant.type';

interface Props {
  membership: Membership;
}

export default function TenantInfoCard({ membership }: Props) {
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
      <div className="flex items-start gap-4">
        {/* Tenant Avatar */}
        <div
          className="
        w-14 h-14 shrink-0
        rounded-2xl
        bg-linear-to-br from-blue-500 to-indigo-600
        text-white
        flex items-center justify-center
        text-lg font-bold
        shadow-lg shadow-blue-500/20
      ">
          {membership.tenant.name?.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tenant Information
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Workspace and membership details
            </p>
          </div>

          {/* Info List */}
          <div className="space-y-3">
            {/* Tenant Name */}
            <div
              className="
            flex items-center justify-between
            rounded-2xl
            bg-gray-50 dark:bg-gray-800/60
            px-4 py-3
          ">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Workspace
              </span>

              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {membership.tenant.name}
              </span>
            </div>

            {/* Role */}
            <div
              className="
            flex items-center justify-between
            rounded-2xl
            bg-gray-50 dark:bg-gray-800/60
            px-4 py-3
          ">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Your Role
              </span>

              <span
                className="
              inline-flex items-center
              rounded-full
              bg-blue-100 dark:bg-blue-900/30
              px-3 py-1
              text-xs font-semibold
              text-blue-700 dark:text-blue-300
            ">
                {membership.role.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
