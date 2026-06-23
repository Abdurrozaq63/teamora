'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useUpdateMemberTenant } from '../hooks/update-member.hook';

interface Props {
  memberId: string;
  tenantId: string;
  roleName: string;
  status: string;
}

export default function UpdateMemberTenant({
  memberId,
  tenantId,
  roleName,
  status,
}: Props) {
  const { update, loading } = useUpdateMemberTenant();
}
