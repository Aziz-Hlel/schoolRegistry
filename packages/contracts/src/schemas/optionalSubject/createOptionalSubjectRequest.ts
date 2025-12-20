import z from 'zod';

const createOptionalSubjectRequestSchema = z.object({
  name: z.string().min(2).max(100),
});

type CreateOptionalSubjectRequest = z.infer<typeof createOptionalSubjectRequestSchema>;

export { createOptionalSubjectRequestSchema };
export type { CreateOptionalSubjectRequest };
