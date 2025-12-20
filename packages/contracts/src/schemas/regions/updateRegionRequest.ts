import z from 'zod';
import { createRegionRequestSchema } from './createRegionRequest';

const updateRegionRequestSchema = createRegionRequestSchema;

type UpdateRegionRequest = z.infer<typeof updateRegionRequestSchema>;

export { updateRegionRequestSchema };
export type { UpdateRegionRequest };
