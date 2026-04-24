import Navbar from '@/app/components/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = [
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
    { name: 'Logout' },
  ];

  return (
    <>
      <Navbar menus={menus} />
      <main className="p-6">{children}</main>
    </>
  );
}
