import { Membership } from '../types/onboarding.type';

import WorkspaceCard from './WorkspaceCard';

interface Props {
  tenants: Membership[];
}

export default function WorkspaceList({ tenants }: Props) {
  return (
    <>
      {tenants.map((tenant) => (
        <WorkspaceCard key={tenant.id} workspace={tenant} />
      ))}
    </>
  );
}
