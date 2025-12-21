import z from 'zod';
import { createDirectorRequestSchema } from '../director/createDirectorRequest';

const createSchoolSchema = z.object({
  name: z.string().min(2).max(200),
  staffCount: z.number().min(1).max(1000),
  director: createDirectorRequestSchema.optional(),
  isPublic: z.boolean(),
  regionId: z.uuid(),
});

type CreateSchool = z.infer<typeof createSchoolSchema>;

export { createSchoolSchema };
export type { CreateSchool };
