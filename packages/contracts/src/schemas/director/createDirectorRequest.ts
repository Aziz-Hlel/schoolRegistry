import z from 'zod';

const createDirectorRequestSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email().max(200).optional(),
  phone: z.coerce.string().min(8).max(8).optional(),
});
type CreateDirectorRequest = z.infer<typeof createDirectorRequestSchema>;

export { createDirectorRequestSchema };
export type { CreateDirectorRequest };
