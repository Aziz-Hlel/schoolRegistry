import z from 'zod';
import { createSchoolSchema } from '../school/createSchoolSchema';

const createMiddleSchoolRequestSchema = createSchoolSchema;

type CreateMiddleSchoolRequest = z.infer<typeof createMiddleSchoolRequestSchema>;

export { createMiddleSchoolRequestSchema };
export type { CreateMiddleSchoolRequest };
