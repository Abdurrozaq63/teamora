export interface CreateAuditLogInput {
  tenantId: string;
  userId: string;
  entity: string;
  entityId: string;
  action: string;
}
