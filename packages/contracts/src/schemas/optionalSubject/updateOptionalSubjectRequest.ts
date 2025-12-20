import z from 'zod';
import { createOptionalSubjectRequestSchema } from './createOptionalSubjectRequest';

const updateOptionalSubjectRequestSchema = createOptionalSubjectRequestSchema;
type UpdateOptionalSubjectRequest = z.infer<typeof updateOptionalSubjectRequestSchema>;

export { updateOptionalSubjectRequestSchema };
export type { UpdateOptionalSubjectRequest };
