import z from 'zod';
import { createDirectorRequestSchema } from './createDirectorRequest';

const updateDirectorRequestSchema = createDirectorRequestSchema;

type UpdateDirectorRequest = z.infer<typeof updateDirectorRequestSchema>;

export { updateDirectorRequestSchema };
export type { UpdateDirectorRequest };
