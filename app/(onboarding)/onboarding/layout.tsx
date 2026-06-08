import Navbar from '@/app/components/navbar';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = [
    { name: 'Profile', href: '/profile' },
    { name: 'Logout', action: 'logout' },
  ];

  return (
    <>
      <Navbar menus={menus} />
      <main className="">{children}</main>
    </>
  );
}
