'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Role = 'OWNER' | 'ADMIN' | 'MEMBER';

type MenuItem = {
  name: string;
  href: string;
  roles?: Role[]; // jika ada → hanya role tertentu yang bisa lihat
};

type SidebarProps = {
  role: Role;
  menus: MenuItem[];
};

export default function Sidebar({ role, menus }: SidebarProps) {
  const pathname = usePathname();

  const filteredMenus = menus.filter((menu) => {
    if (!menu.roles) return true;
    return menu.roles.includes(role);
  });

  return (
    <aside className="h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-4">
      <nav>
        <ul className="space-y-1">
          {filteredMenus.map((menu) => {
            const isActive = pathname === menu.href;

            return (
              <li key={menu.name}>
                <Link
                  href={menu.href}
                  className={`block rounded-lg px-4 py-2 text-lg font-medium transition
                    ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                    }`}>
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
