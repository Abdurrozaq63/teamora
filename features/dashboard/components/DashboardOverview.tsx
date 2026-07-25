import { Membership } from '@/features/dashboard/types/tenant.type';

import TenantInfoCard from './TenantInfoCard';

import StatsCards from './StatsCards';

import RecentProjects from './RecentProjects';

import RecentActivity from './RecentActivity';

import { getDashboardStats } from '../services/StatDashboard.service';
import { AuditLog } from '@/features/auditLog/types/audit-log.type';

interface Props {
  membership: Membership;
  activity: AuditLog[];
}

export default async function DashboardOverview({
  membership,
  activity,
}: Props) {
  const statDashboard = await getDashboardStats({
    tenantId: membership.tenantId,
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>
      </div>

      <TenantInfoCard membership={membership} />

      <StatsCards stats={statDashboard} />

      {/* <RecentProjects /> */}

      <RecentActivity activities={activity} />
    </div>
  );
}
