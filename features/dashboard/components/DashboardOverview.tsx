import { Membership } from '@/features/dashboard/types/tenant.type';

import TenantInfoCard from './TenantInfoCard';

import StatsCards from './StatsCards';

import RecentProjects from './RecentProjects';

import RecentActivity from './RecentActivity';

interface Props {
  membership: Membership;
}

export default function DashboardOverview({ membership }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>
      </div>

      <TenantInfoCard membership={membership} />

      <StatsCards />

      <RecentProjects />

      <RecentActivity />
    </div>
  );
}
