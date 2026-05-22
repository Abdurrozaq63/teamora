import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { useCreateMember } from '../hooks/create-member.hook';
import { MemberProject } from '../types/member-project.type';
export default function CreateMember() {
  const { unmemberProjects, removeUnmember, projectId, setMemberProject } =
    useProjectStore();
  const [errorMessage, setErrorMessage] = useState('');
  const { createMember, loading } = useCreateMember();
  if (!projectId) {
    return;
  }
  const handleAdd = async (member: MemberProject, tenantId: string) => {
    const userId = member.userId;
    const res = await createMember(userId, tenantId);
    console.log('res', res);
    if (!res.ok) {
      setErrorMessage('failed');
      return;
    }
    removeUnmember(member.id);
    setMemberProject(member);
  };
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm ">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Member Tenant
        </h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Assign member tenant to member project
        </p>
      </div>

      {/* Table Header - Desktop */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300">
        <span>User</span>
        <span>Email</span>
        <span>Role</span>
        <span>Joined</span>
        <span className="text-center">Action</span>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {unmemberProjects.map((x, index) => {
          const roleColor =
            x.role.name === 'ADMIN' ? 'bg-blue-500' : 'bg-emerald-500';

          const roleBadge =
            x.role.name === 'ADMIN'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';

          return (
            <div
              key={index}
              className="
            flex flex-col gap-3 p-4
            md:grid md:grid-cols-5 md:gap-4 md:items-center
            hover:bg-gray-50 dark:hover:bg-gray-800/40
            transition-colors
          ">
              {/* User */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full ${roleColor} text-white flex items-center justify-center font-semibold shrink-0`}>
                  {x.user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col min-w-0">
                  {/* Mobile Label */}
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                    User
                  </span>

                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {x.user.name}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                  Email
                </span>

                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {x.user.email}
                </span>
              </div>

              {/* Role */}
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden mb-1">
                  Role
                </span>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${roleBadge}`}>
                    {x.role.name}
                  </span>
                </div>
              </div>

              {/* Joined */}
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wide text-gray-400 md:hidden">
                  Joined
                </span>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(x.joinedAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end md:justify-center">
                <button
                  onClick={() =>
                    handleAdd(
                      {
                        id: x.id,
                        userId: x.userId,
                        projectId: projectId,
                        role: x.role.name,
                        joinedAt: x.joinedAt,
                        user: x.user,
                      },
                      x.tenantId,
                    )
                  }
                  className="p-2 cursor-pointer rounded-full bg-gray-900 dark:bg-white  hover:scale-105 active:scale-95 ">
                  <span className="text-white dark:text-black text-2xl">
                    {loading ? 'o' : '+'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
