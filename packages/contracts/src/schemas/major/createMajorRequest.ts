import z from 'zod';

const createMajorRequestSchema = z.object({
  name: z.string().min(2).max(200),
  sortOrder: z.coerce.number().min(0).max(100),
});

type CreateMajorRequest = z.infer<typeof createMajorRequestSchema>;

export { createMajorRequestSchema };
export type { CreateMajorRequest };
