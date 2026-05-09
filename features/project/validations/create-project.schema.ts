import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(3, 'Nama project minimal 3 karakter'),

  description: z.string().min(3, 'Description minimal 3 karakter'),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
