'use client';
import { requireOwner } from '@/lib/permissions';
export default async function Dashboard() {
  await requireOwner();
  return (
    <div>
      <h1 className="font-black">exampermissions</h1>
    </div>
  );
}
