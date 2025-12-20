import z from 'zod';
import { createDirectorRequestSchema } from '../director/createDirectorRequest';

const createHighSchoolRequestSchema = z.object({
  name: z.string().min(2).max(200),
  address: z.string().min(5).max(300),
  staffCount: z.coerce.number().min(0).max(1000).optional(),
  regionId: z.uuid(),
  director: createDirectorRequestSchema.optional(),
});

type CreateHighSchoolRequest = z.infer<typeof createHighSchoolRequestSchema>;

export { createHighSchoolRequestSchema };
export type { CreateHighSchoolRequest };
