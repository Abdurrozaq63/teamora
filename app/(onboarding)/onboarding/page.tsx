import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import { getTenantList } from '@/features/onboarding/services/tenant-list.service';

import OnboardingView from '@/features/onboarding/components/OnboardingView';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const tenants = await getTenantList(session.user.id);

  return <OnboardingView initialTenants={tenants} />;
}
