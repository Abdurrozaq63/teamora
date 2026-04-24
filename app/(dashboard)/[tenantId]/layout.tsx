import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';

export type Role = 'OWNER' | 'ADMIN' | 'MEMBER';

export type MenuItem = {
  name: string;
  href: string;
  roles?: Role[];
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role: 'OWNER' | 'ADMIN' | 'MEMBER' = 'OWNER'; // ambil dari session / DB

  const menus: MenuItem[] = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Members', href: '/members' },
    {
      name: 'Audit Logs',
      href: '/audit-logs',
      roles: ['OWNER', 'ADMIN'],
    },
    {
      name: 'Settings',
      href: '/settings',
      roles: ['OWNER', 'ADMIN'],
    },
  ];
  const menuNav = [
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Logout' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar menus={menuNav} />
      </header>

      <div className="flex flex-1">
        <aside className="w-64 h-[calc(100vh-64px)] sticky top-16">
          <Sidebar role={role} menus={menus} />
        </aside>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
