import z from 'zod';
import { createMajorRequestSchema } from './createMajorRequest';

const updateMajorRequestSchema = createMajorRequestSchema;

type UpdateMajorRequest = z.infer<typeof updateMajorRequestSchema>;

export { updateMajorRequestSchema };
export type { UpdateMajorRequest };
