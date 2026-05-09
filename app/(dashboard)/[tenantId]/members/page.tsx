import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const getListTenant = await prisma.membership.findMany({
    where: {
      userId: session.user.id,
      status: 'ACTIVE',
    },
    include: {
      tenant: true,
      role: true,
    },
  });

  return (
    <div>
      <h1>List Tenant</h1>

      {getListTenant.length === 0 ? (
        <p>Tidak ada tenant</p>
      ) : (
        <ul>
          {getListTenant.map((item) => (
            <li key={item.id}>
              <p>Tenant: {item.tenant.name}</p>
              <p>Role: {item.role.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
