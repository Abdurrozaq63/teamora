import { Membership } from '../types/member-list.type';

interface Props {
  listMember: Membership[];
}

export default function MemberTenantTable({ listMember }: Props) {
  return (
    <div
      className="
        rounded-3xl
        border border-gray-200 dark:border-gray-800
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
        shadow-sm
        overflow-hidden
      ">
      {/* Header Desktop */}
      <div
        className="
          hidden md:grid
          grid-cols-5
          gap-4
          px-5 py-4
          bg-gray-50 dark:bg-gray-800/50
          text-xs font-semibold
          uppercase tracking-wide
          text-gray-500
        ">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
        <span>Status</span>
        <span className="text-center">Action</span>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {listMember.map((member) => {
          const roleBadge =
            member.role.name === 'ADMIN'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';

          const statusBadge =
            member.status === 'ACTIVE'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

          return (
            <div
              key={member.id}
              className="
                flex flex-col gap-3 p-5
                md:grid md:grid-cols-5 md:gap-4 md:items-center
                hover:bg-gray-50
                dark:hover:bg-gray-800/40
                transition
              ">
              {/* Name */}
              <div className="flex flex-col">
                <span className="md:hidden text-[11px] uppercase text-gray-400">
                  Name
                </span>

                <span className="font-medium text-gray-900 dark:text-white">
                  {member.user.name}
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col min-w-0">
                <span className="md:hidden text-[11px] uppercase text-gray-400">
                  Email
                </span>

                <span className="truncate text-sm text-gray-600 dark:text-gray-400">
                  {member.user.email}
                </span>
              </div>

              {/* Role */}
              <div className="flex flex-col">
                <span className="md:hidden text-[11px] uppercase text-gray-400 mb-1">
                  Role
                </span>

                <span
                  className={`
                    inline-flex w-fit
                    rounded-full
                    px-3 py-1
                    text-xs font-medium
                    ${roleBadge}
                  `}>
                  {member.role.name}
                </span>
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <span className="md:hidden text-[11px] uppercase text-gray-400 mb-1">
                  Status
                </span>

                <span
                  className={`
                    inline-flex w-fit
                    rounded-full
                    px-3 py-1
                    text-xs font-medium
                    ${statusBadge}
                  `}>
                  {member.status}
                </span>
              </div>

              {/* Action */}
              <div className="flex gap-2 md:justify-center">
                <button
                  className="
                    px-3 py-2
                    rounded-xl
                    bg-amber-500
                    hover:bg-amber-600
                    text-white
                    text-sm font-medium
                    transition
                    cursor-pointer
                  ">
                  Update
                </button>

                <button
                  className="
                    px-3 py-2
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    text-sm font-medium
                    transition
                    cursor-pointer
                  ">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
