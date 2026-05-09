import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';

export type Role = 'OWNER' | 'ADMIN' | 'MEMBER';

export type MenuItem = {
  name: string;
  href: string;
  roles?: Role[];
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantId: string };
}) {
  const { tenantId } = await params;
  const role: 'OWNER' | 'ADMIN' | 'MEMBER' = 'OWNER'; // ambil dari session / DB

  const menus: MenuItem[] = [
    { name: 'Dashboard', href: `/${tenantId}` },
    { name: 'Projects', href: `/${tenantId}/projects` },
    { name: 'Tasks', href: `/${tenantId}/tasks` },
    { name: 'Members', href: `/${tenantId}/members` },
    {
      name: 'Audit Logs',
      href: `/${tenantId}/auditlogs`,
      roles: ['OWNER', 'ADMIN'],
    },
    {
      name: 'Settings',
      href: `/${tenantId}/settings`,
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
