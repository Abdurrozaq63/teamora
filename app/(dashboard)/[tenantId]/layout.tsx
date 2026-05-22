import Navbar from '@/app/components/navbar';
import Sidebar from '@/app/components/sidebar';
import DashboardShell from '@/app/components/DashboardShell';

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
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = await params;
  const role: 'OWNER' | 'ADMIN' | 'MEMBER' = 'OWNER'; // ambil dari session / DB

  const menus: MenuItem[] = [
    { name: 'Dashboard', href: `/${tenantId}` },
    { name: 'Projects', href: `/${tenantId}/projects` },
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

      <DashboardShell sidebar={<Sidebar role={role} menus={menus} />}>
        {children}
      </DashboardShell>
    </div>
  );
}
