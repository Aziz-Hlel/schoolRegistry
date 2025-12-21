import z from 'zod';

const createElectiveRequestSchema = z.object({
  name: z.string().min(2).max(100),
});

type CreateElectiveRequest = z.infer<typeof createElectiveRequestSchema>;

export { createElectiveRequestSchema };
export type { CreateElectiveRequest };
