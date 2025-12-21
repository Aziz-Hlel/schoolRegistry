import z from 'zod';
import { createElectiveRequestSchema } from './createElectiveRequest';

const updateElectiveRequestSchema = createElectiveRequestSchema;
type UpdateElectiveRequest = z.infer<typeof updateElectiveRequestSchema>;

export { updateElectiveRequestSchema };
export type { UpdateElectiveRequest };
