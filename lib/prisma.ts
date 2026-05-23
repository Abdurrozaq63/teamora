import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });
// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter,
//   });
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
// export { prisma };
