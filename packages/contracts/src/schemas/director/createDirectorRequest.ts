import z from 'zod';

const createDirectorRequestSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.email().max(200).nullable(),
  phone: z.string().min(8).max(8).nullable(),
});
type CreateDirectorRequest = z.infer<typeof createDirectorRequestSchema>;

export { createDirectorRequestSchema };
export type { CreateDirectorRequest };
