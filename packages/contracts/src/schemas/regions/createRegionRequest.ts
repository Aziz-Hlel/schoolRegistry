import z from 'zod';

const createRegionRequestSchema = z.object({
  name: z.string().min(2).max(100),
});

type CreateRegionRequest = z.infer<typeof createRegionRequestSchema>;

export { createRegionRequestSchema };
export type { CreateRegionRequest };
