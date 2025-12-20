import z from 'zod';

const createMajorRequestSchema = z.object({
  name: z.string().min(2).max(200),
});

type CreateMajorRequest = z.infer<typeof createMajorRequestSchema>;

export { createMajorRequestSchema };
export type { CreateMajorRequest };
