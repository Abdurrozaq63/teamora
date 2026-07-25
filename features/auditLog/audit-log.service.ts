import { prisma } from '@/lib/prisma';

import { CreateAuditLogInput } from './audit-log.type';

class AuditLogService {
  async create(data: CreateAuditLogInput) {
    return prisma.auditLog.create({
      data,
    });
  }
  async getByTenant(tenantId: string, page = 1, limit = 20) {
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: {
          tenantId,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.auditLog.count({
        where: {
          tenantId,
        },
      }),
    ]);
    return {
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const auditLogService = new AuditLogService();
