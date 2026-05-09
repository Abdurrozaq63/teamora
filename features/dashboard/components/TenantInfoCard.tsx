import { Membership } from '@/features/dashboard/types/tenant.type';

interface Props {
  membership: Membership;
}

export default function TenantInfoCard({ membership }: Props) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
        Tenant Info
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Nama: <span className="font-medium">{membership.tenant.name}</span>
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Role: <span className="font-medium">{membership.role.name}</span>
      </p>
    </div>
  );
}
