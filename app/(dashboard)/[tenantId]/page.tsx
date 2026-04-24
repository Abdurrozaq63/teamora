'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Membership = {
  id: string;
  userId: string;
  tenantId: string;
  roleId: string;
  status: string;
  joinedAt: string;
  tenant: {
    id: string;
    name: string;
    inviteCode: string;
    createdAt: string;
    deletedAt: string | null;
  };
  role: {
    id: string;
    name: string;
  };
};

export default function Dashboard() {
  //requireAdminOwner();
  const params = useParams();
  const router = useRouter();
  const tenantId = params.tenantId as string;
  const [data, setData] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTenant(tenantId);
  }, [tenantId]);

  async function getTenant(tenantId: string) {
    const res = await fetch('/api/dashboard/getSelectedTenant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenantId }),
    });
    const result = await res.json();
    if (!res.ok) {
      if (result.redirectTo) {
        router.push(result.redirectTo);
        return;
      } else {
        alert(result.message);
        return;
      }
    }
    setData(result);
  }

  if (!data || data == null) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500">
          Ringkasan kondisi workspace kamu
        </p>
      </div>

      {/* TENANT INFO */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
          Tenant Info
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Nama: <span className="font-medium">{data.tenant.name}</span>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Role: <span className="font-medium">{data.role.name}</span>
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500">Total Projects</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            12
          </h3>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            128
          </h3>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500">Tasks Completed</p>
          <h3 className="text-xl font-bold text-green-600">98</h3>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-sm text-gray-500">Total Members</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">6</h3>
        </div>
      </div>

      {/* RECENT PROJECTS */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">
          Recent Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2">Project</th>
                <th>Status</th>
                <th>Tasks</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-2">Website Revamp</td>
                <td>Active</td>
                <td>32</td>
                <td>2 hours ago</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-2">Mobile App</td>
                <td>In Progress</td>
                <td>54</td>
                <td>1 day ago</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-2">API Development</td>
                <td>Completed</td>
                <td>42</td>
                <td>3 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>
              <strong>Ahmad</strong> membuat project baru
            </span>
            <span>2 jam lalu</span>
          </div>

          <div className="flex justify-between">
            <span>
              <strong>Budi</strong> menyelesaikan task
            </span>
            <span>5 jam lalu</span>
          </div>

          <div className="flex justify-between">
            <span>
              <strong>Siti</strong> menambahkan member
            </span>
            <span>1 hari lalu</span>
          </div>

          <div className="flex justify-between">
            <span>
              <strong>Rina</strong> mengupdate project
            </span>
            <span>2 hari lalu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
