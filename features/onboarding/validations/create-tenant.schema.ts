import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(3, 'Nama workspace minimal 3 karakter'),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
